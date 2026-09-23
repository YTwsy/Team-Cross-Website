"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Clock3,
  FileText,
  MessageSquare,
  Search,
  Star,
  TerminalSquare,
  UsersRound,
} from "lucide-react";

import { websiteCopy } from "../content/website";
import { useLocale } from "./locale-context";

type LibraryView = "recent" | "participated" | "annotated" | "favorites";
type LibraryType = "all" | "material" | "annotation" | "context";

const viewIcons = {
  recent: Clock3,
  participated: UsersRound,
  annotated: MessageSquare,
  favorites: Star,
};

const typeIcons = {
  material: FileText,
  annotation: MessageSquare,
  context: TerminalSquare,
};

export function LibrarySection() {
  const locale = useLocale();
  const copy = websiteCopy[locale].library;
  const [view, setView] = useState<LibraryView>("recent");
  const [type, setType] = useState<LibraryType>("all");
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState<number[]>([0, 1]);
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [search, setSearch] = useState("");
  const query = search.trim().toLocaleLowerCase(locale);
  const countLabel = (count: number) =>
    count + " " + (locale === "en" ? (count === 1 ? "item" : "items") : "项");
  const matches = copy.resources
    .map((_, index) => index)
    .filter((index) => {
      const resource = copy.resources[index];
      if (view === "annotated" && !resource.annotated) return false;
      if (view === "favorites" && !favorites.includes(index)) return false;
      if (type !== "all" && resource.type !== type) return false;
      const group = copy.groups.find((item) => item.id === resource.group);
      return [
        resource.title,
        resource.subtitle,
        resource.source,
        resource.excerpt,
        resource.comment,
        resource.commentAuthor,
        group?.title,
      ]
        .join(" ")
        .toLocaleLowerCase(locale)
        .includes(query);
    });
  const displayedActive = matches.includes(active) ? active : (matches[0] ?? active);
  const current = copy.resources[displayedActive] ?? copy.resources[0];

  const toggleSelected = (index: number) => {
    setSelected((previous) =>
      previous.includes(index)
        ? previous.filter((value) => value !== index)
        : [...previous, index],
    );
  };

  const toggleFavorite = (index: number) => {
    setFavorites((previous) =>
      previous.includes(index)
        ? previous.filter((value) => value !== index)
        : [...previous, index],
    );
  };

  return (
    <section
      className="library-section container section-space"
      id="library"
      aria-labelledby="library-title"
    >
      <div className="library-intro">
        <div>
          <span className="overline">{copy.overline}</span>
          <h2 id="library-title">{copy.title}</h2>
        </div>
        <p>{copy.description}</p>
      </div>

      <div className="library-demo" role="region" aria-label={copy.previewLabel}>
        <div className="library-chrome">
          <div className="library-brand">
            <Image src="/brand-mark.svg" width={25} height={25} alt="" />
            <strong>Team Cross</strong>
          </div>
          <div className="library-preview-nav" aria-hidden="true">
            {copy.navigation.map((label, index) => (
              <span
                className={index === 1 ? "library-preview-nav-current" : ""}
                key={label}
              >
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="library-main">
          <nav className="library-views" aria-label={copy.viewsLabel}>
            {copy.views.map(({ id, label }) => {
              const Icon = viewIcons[id];
              const count =
                id === "annotated"
                  ? copy.resources.filter((resource) => resource.annotated)
                      .length
                  : id === "favorites"
                    ? favorites.length
                    : copy.resources.length;

              return (
                <button
                  type="button"
                  className="library-view"
                  aria-pressed={view === id}
                  onClick={() => setView(id)}
                  key={id}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{label}</span>
                  <small>{count}</small>
                </button>
              );
            })}
          </nav>

          <div className="library-browse">
            <div className="library-list-heading">
              <strong>{copy.listTitle}</strong>
              <span aria-live="polite">{countLabel(matches.length)}</span>
            </div>
            <label className="library-search">
              <Search size={17} aria-hidden="true" />
              <span className="sr-only">{copy.searchLabel}</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={copy.searchPlaceholder}
              />
            </label>
            <div
              className="library-type-filters"
              role="group"
              aria-label={copy.typesLabel}
            >
              {copy.types.map(({ id, label }) => (
                <button
                  type="button"
                  aria-pressed={type === id}
                  onClick={() => setType(id)}
                  key={id}
                >
                  {label}
                </button>
              ))}
            </div>

            {copy.groups.map((group) => {
              const groupMatches = matches.filter(
                (index) => copy.resources[index].group === group.id,
              );
              if (groupMatches.length === 0) return null;

              return (
                <div className="library-group" key={group.id}>
                  <div className="library-group-heading">
                    <strong>{group.title}</strong>
                    <span>{groupMatches.length}</span>
                  </div>
                  {groupMatches.map((index) => {
                    const resource = copy.resources[index];
                    const Icon = typeIcons[resource.type];
                    const favorite = favorites.includes(index);

                    return (
                      <div
                        className="library-item"
                        data-active={displayedActive === index}
                        key={index}
                      >
                        <label className="library-pick">
                          <input
                            type="checkbox"
                            checked={selected.includes(index)}
                            onChange={() => toggleSelected(index)}
                            aria-label={resource.selectLabel}
                          />
                        </label>
                        <button
                          type="button"
                          className="library-open"
                          aria-current={
                            displayedActive === index ? "true" : undefined
                          }
                          onClick={() => setActive(index)}
                        >
                          <Icon size={17} aria-hidden="true" />
                          <span>
                            {resource.title}
                            <small>{resource.subtitle}</small>
                          </span>
                        </button>
                        <button
                          type="button"
                          className="library-favorite"
                          aria-label={
                            (favorite ? copy.unfavorite : copy.favorite) +
                            " " +
                            resource.title
                          }
                          aria-pressed={favorite}
                          onClick={() => toggleFavorite(index)}
                        >
                          <Star
                            size={17}
                            fill={favorite ? "currentColor" : "none"}
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            {matches.length === 0 && (
              <p className="library-empty" role="status">
                {copy.noResults}
              </p>
            )}
          </div>

          <div className="library-reader" aria-live="polite">
            <div className="library-reader-meta">
              <span>{current.kind}</span>
              <span className="library-version">{current.version}</span>
            </div>
            <h3>{current.title}</h3>
            <p className="library-source">{current.source}</p>
            <span className="library-detail-label">{current.excerptLabel}</span>
            <blockquote>{current.excerpt}</blockquote>
            {current.comment && (
              <div className="library-discussion">
                <span className="library-detail-label">
                  {copy.discussionLabel}
                </span>
                <div className="library-comment">
                  <span className="library-avatar" aria-hidden="true">
                    {current.commentAuthor.charAt(0)}
                  </span>
                  <div>
                    <strong>{current.commentAuthor}</strong>
                    <p>{current.comment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="library-selection">
          <strong aria-live="polite">
            {copy.selectedLabel} <span>{countLabel(selected.length)}</span>
          </strong>
          <span>{copy.selectionNote}</span>
        </div>
      </div>
      <p className="library-scope">{copy.scope}</p>
    </section>
  );
}
