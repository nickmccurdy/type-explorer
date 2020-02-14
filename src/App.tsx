import React, { FormEvent, useState } from "react";
import MonacoEditor from "react-monaco-editor";

// From https://github.com/microsoft/TypeSearch
interface MinifiedSearchRecord {
  // types package name
  t: string;
  // globals
  g: string[];
  // modules
  m: string[];
  // project name
  p: string;
  // library name
  l: string;
  // downloads in the last month from NPM
  d: number;
}

async function hasTypesPkg(pkg: string) {
  const response = await fetch(
    "https://typespublisher.blob.core.windows.net/typespublisher/data/search-index-min.json"
  );
  const data: MinifiedSearchRecord[] = await response.json();
  return data.some(({ t }) => t === pkg);
}

interface Package {
  "dist-tags": {
    latest: string;
  };
  versions: {
    [version: string]: {
      types?: string;
      typings?: string;
    };
  };
}

async function getManifest(pkg: string) {
  const response = await fetch(
    `https://cors-anywhere.herokuapp.com/https://registry.npmjs.com/${pkg}`
  );
  if (!response.ok) {
    throw await response.text();
  }
  const data: Package = await response.json();
  const pkgJson = data.versions[data["dist-tags"].latest];
  return pkgJson.types || pkgJson.typings;
}

async function getTypesUrl(pkg: string) {
  const pkgTypes = await getManifest(pkg);

  if (pkgTypes) {
    return `https://unpkg.com/${pkg}/${pkgTypes}`;
  } else if (await hasTypesPkg(pkg)) {
    return `https://unpkg.com/@types/${pkg}/index.d.ts`;
  }
}

async function getTypes(pkg: string) {
  const typesUrl = await getTypesUrl(pkg);

  if (typesUrl) {
    const response = await fetch(typesUrl);
    return response.text();
  }
}

export default function App() {
  const [pkg, setPkg] = useState("");
  const [source, setSource] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setSource((await getTypes(pkg)) || "");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ height: "100%" }}>
      <label>
        Package:{" "}
        <input
          type="search"
          value={pkg}
          onChange={event => setPkg(event.target.value)}
        />
      </label>
      <br />
      <button>Submit</button>
      {source && (
        <MonacoEditor
          language="typescript"
          value={source}
          options={{ readOnly: true, minimap: { enabled: false } }}
        />
      )}
    </form>
  );
}
