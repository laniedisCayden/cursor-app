"use client";

import { useMemo, useState } from "react";

function createSeedKeys() {
  return [
    {
      id: crypto.randomUUID(),
      name: "Payments Service",
      value: "sk-live-1234",
      lastUsed: "2025-12-31",
    },
    {
      id: crypto.randomUUID(),
      name: "Webhook Handler",
      value: "wh-secure-5678",
      lastUsed: "2025-12-15",
    },
  ];
}

export default function DashboardsPage() {
  const [keys, setKeys] = useState(createSeedKeys);
  const [newName, setNewName] = useState("");
  const [newValue, setNewValue] = useState("");

  const totalKeys = useMemo(() => keys.length, [keys]);

  const handleCreate = () => {
    if (!newName.trim() || !newValue.trim()) return;
    setKeys((prev) => [
      {
        id: crypto.randomUUID(),
        name: newName.trim(),
        value: newValue.trim(),
        lastUsed: "Never",
      },
      ...prev,
    ]);
    setNewName("");
    setNewValue("");
  };

  const handleUpdate = (id, field, value) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, [field]: value } : k))
    );
  };

  const handleDelete = (id) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex max-w-4xl flex-col gap-10 px-6 py-12">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              API Keys
            </p>
            <h1 className="text-3xl font-semibold">Dashboards</h1>
            <p className="text-zinc-600 dark:text-zinc-400">
              Create, edit, rotate, or delete keys from one place.
            </p>
          </div>
        </header>

        <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold">Keys overview</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Total keys: {totalKeys}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Key name"
                className="h-10 rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
              />
              <input
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                placeholder="Key value"
                className="h-10 min-w-[200px] flex-1 rounded-lg border border-zinc-300 bg-white px-3 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
              />
              <button
                onClick={handleCreate}
                className="h-10 rounded-lg bg-black px-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                disabled={!newName.trim() || !newValue.trim()}
              >
                Create key
              </button>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="grid grid-cols-12 bg-zinc-100 px-4 py-3 text-xs font-medium uppercase text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400">
              <span className="col-span-3">Name</span>
              <span className="col-span-5">Value</span>
              <span className="col-span-2">Last used</span>
              <span className="col-span-2 text-right">Actions</span>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {keys.map((key) => (
                <div
                  key={key.id}
                  className="grid grid-cols-12 items-center gap-2 px-4 py-3"
                >
                  <input
                    value={key.name}
                    onChange={(e) =>
                      handleUpdate(key.id, "name", e.target.value)
                    }
                    className="col-span-3 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                  <input
                    value={key.value}
                    onChange={(e) =>
                      handleUpdate(key.id, "value", e.target.value)
                    }
                    className="col-span-5 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                  <span className="col-span-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {key.lastUsed}
                  </span>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDelete(key.id)}
                      className="rounded-lg border border-zinc-300 px-3 py-2 text-xs font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {keys.length === 0 && (
                <div className="px-4 py-6 text-sm text-zinc-600 dark:text-zinc-400">
                  No keys yet. Create one to get started.
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

