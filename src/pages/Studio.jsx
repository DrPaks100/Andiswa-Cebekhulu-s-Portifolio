import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getGithubToken,
  isStudioSignedIn,
  setGithubToken,
  setStudioSignedIn,
  studioEmailHint,
  verifyStudioLogin,
} from "../utils/studioAuth";
import {
  blobToBase64,
  compressImage,
  githubDelete,
  githubGet,
  githubPut,
  makeUploadId,
  utf8ToBase64,
} from "../utils/studioGithub";
import { fetchUploadedDesigns } from "../utils/designGallery";

const MAIN_JSON = "public/designs.json";
const LIVE_JSON = "designs.json";

export default function Studio() {
  const [signedIn, setSignedIn] = useState(isStudioSignedIn());
  const [email, setEmail] = useState(studioEmailHint());
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(getGithubToken());
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (!signedIn) return;
    fetchUploadedDesigns()
      .then(setUploads)
      .catch(() => setUploads([]));
  }, [signedIn]);

  async function onLogin(e) {
    e.preventDefault();
    setError("");
    const ok = await verifyStudioLogin(email, password);
    if (!ok) {
      setError("Email or password is incorrect.");
      return;
    }
    setStudioSignedIn(true);
    setSignedIn(true);
    setPassword("");
  }

  function onLogout() {
    setStudioSignedIn(false);
    setSignedIn(false);
    setPassword("");
  }

  function saveToken(e) {
    e.preventDefault();
    setGithubToken(token);
    setNotice("GitHub token saved on this device.");
    setError("");
  }

  async function publishFile(ghToken, { livePath, mainPath, content, message }) {
    const [liveExisting, mainExisting] = await Promise.all([
      githubGet(ghToken, livePath, "gh-pages"),
      githubGet(ghToken, mainPath, "main"),
    ]);
    await githubPut(ghToken, {
      path: livePath,
      branch: "gh-pages",
      message,
      content,
      sha: liveExisting?.sha,
    });
    await githubPut(ghToken, {
      path: mainPath,
      branch: "main",
      message,
      content,
      sha: mainExisting?.sha,
    });
  }

  async function readCatalog(ghToken) {
    const live = await githubGet(ghToken, LIVE_JSON, "gh-pages");
    if (live?.content) {
      const json = decodeGithubJson(live.content);
      return { items: Array.isArray(json.items) ? json.items : [] };
    }
    const main = await githubGet(ghToken, MAIN_JSON, "main");
    if (main?.content) {
      const json = decodeGithubJson(main.content);
      return { items: Array.isArray(json.items) ? json.items : [] };
    }
    return { items: [] };
  }

  async function writeCatalog(ghToken, catalog, message) {
    const content = utf8ToBase64(`${JSON.stringify(catalog, null, 2)}\n`);
    await publishFile(ghToken, {
      livePath: LIVE_JSON,
      mainPath: MAIN_JSON,
      content,
      message,
    });
  }

  async function onUpload(e) {
    e.preventDefault();
    setError("");
    setNotice("");
    const ghToken = getGithubToken();
    if (!ghToken) {
      setError("Save a GitHub token first so the picture can go live.");
      return;
    }
    if (!file) {
      setError("Choose a picture to upload.");
      return;
    }
    if (!title.trim()) {
      setError("Give the design a title.");
      return;
    }

    try {
      setBusy("Preparing picture…");
      const blob = await compressImage(file);
      const content = await blobToBase64(blob);
      const id = makeUploadId();
      const livePath = `uploads/${id}.jpg`;
      const mainPath = `public/uploads/${id}.jpg`;
      const item = {
        id,
        title: title.trim(),
        caption: caption.trim(),
        tool: "Photoshop",
        file: livePath,
      };

      setBusy("Publishing picture…");
      await publishFile(ghToken, {
        livePath,
        mainPath,
        content,
        message: `Add design ${item.title}`,
      });

      setBusy("Updating gallery…");
      const catalog = await readCatalog(ghToken);
      catalog.items = [item, ...catalog.items.filter((row) => row.id !== id)];
      await writeCatalog(ghToken, catalog, `List design ${item.title}`);

      setUploads(await fetchUploadedDesigns());
      setTitle("");
      setCaption("");
      setFile(null);
      e.target.reset?.();
      setNotice("Design is live on Visual craft. Give the page a refresh if it does not show yet.");
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setBusy("");
    }
  }

  async function onDelete(item) {
    const ghToken = getGithubToken();
    if (!ghToken) {
      setError("Save a GitHub token first.");
      return;
    }
    if (!window.confirm(`Remove “${item.title}” from Visual craft?`)) return;

    try {
      setBusy("Removing design…");
      const liveFile = await githubGet(ghToken, item.file, "gh-pages");
      const mainFile = await githubGet(ghToken, `public/${item.file}`, "main");
      if (liveFile?.sha) {
        await githubDelete(ghToken, {
          path: item.file,
          branch: "gh-pages",
          message: `Remove design ${item.title}`,
          sha: liveFile.sha,
        });
      }
      if (mainFile?.sha) {
        await githubDelete(ghToken, {
          path: `public/${item.file}`,
          branch: "main",
          message: `Remove design ${item.title}`,
          sha: mainFile.sha,
        });
      }
      const catalog = await readCatalog(ghToken);
      catalog.items = catalog.items.filter((row) => row.id !== item.id);
      await writeCatalog(ghToken, catalog, `Unlist design ${item.title}`);
      setUploads(await fetchUploadedDesigns());
      setNotice("Design removed.");
    } catch (err) {
      setError(err.message || "Could not remove that design.");
    } finally {
      setBusy("");
    }
  }

  return (
    <section className="section studio">
      <div className="container studio__wrap">
        <p className="section-label">Studio</p>
        <h1 className="section-title">Design uploads</h1>
        <p className="section-lead">
          Sign in, then add posters here. They appear on Visual craft — no code
          edit and no database.
        </p>

        {!signedIn ? (
          <form className="studio__card" onSubmit={onLogin}>
            <label className="studio__field">
              Email
              <input
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label className="studio__field">
              Password
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            {error && <p className="studio__error">{error}</p>}
            <button className="btn btn--primary" type="submit">
              Sign in
            </button>
          </form>
        ) : (
          <>
            <div className="studio__toolbar">
              <p>Signed in</p>
              <button type="button" className="btn btn--ghost" onClick={onLogout}>
                Sign out
              </button>
            </div>

            <form className="studio__card" onSubmit={saveToken}>
              <h2>GitHub token</h2>
              <p className="studio__hint">
                Needed once so uploads can go live on GitHub Pages. Create a
                classic token with <strong>public_repo</strong> at{" "}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  github.com/settings/tokens
                </a>
                . It stays on this device only.
              </p>
              <label className="studio__field">
                Token
                <input
                  type="password"
                  autoComplete="off"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_…"
                />
              </label>
              <button className="btn btn--ghost" type="submit">
                Save token
              </button>
            </form>

            <form className="studio__card" onSubmit={onUpload}>
              <h2>New design</h2>
              <label className="studio__field">
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Sunday Service — Grace Transformation Church"
                  required
                />
              </label>
              <label className="studio__field">
                Caption
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Optional short line under the title"
                />
              </label>
              <label className="studio__field">
                Picture
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  required
                />
              </label>
              {busy && <p className="studio__hint">{busy}</p>}
              {error && <p className="studio__error">{error}</p>}
              {notice && <p className="studio__notice">{notice}</p>}
              <button className="btn btn--primary" type="submit" disabled={!!busy}>
                {busy ? "Working…" : "Upload to Visual craft"}
              </button>
            </form>

            <div className="studio__card">
              <h2>Uploaded</h2>
              {uploads.length === 0 ? (
                <p className="studio__hint">No extra designs yet.</p>
              ) : (
                <ul className="studio__list">
                  {uploads.map((item) => (
                    <li key={item.id}>
                      <img src={item.image} alt="" />
                      <div>
                        <strong>{item.title}</strong>
                        {item.caption ? <span>{item.caption}</span> : null}
                      </div>
                      <button
                        type="button"
                        className="btn btn--ghost"
                        disabled={!!busy}
                        onClick={() => onDelete(item)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p className="studio__hint">
              <Link to="/design">Open Visual craft</Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function decodeGithubJson(content) {
  const clean = String(content).replace(/\n/g, "");
  return JSON.parse(decodeURIComponent(escape(atob(clean))));
}
