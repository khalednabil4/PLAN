import { useState } from 'react'
import brandMark from '../docs/assets/alnafitha_brand_mark_generated.png'
import documentData from '../docs/presales_checklist_source.json'
import './App.css'

function App() {
  const [currentPageId, setCurrentPageId] = useState(documentData.pages[0].id)
  const currentPage =
    documentData.pages.find((page) => page.id === currentPageId) ?? documentData.pages[0]
  const [openItems, setOpenItems] = useState({
    [documentData.pages[0].checklists[0].id]: true,
  })

  const toggleItem = (id) => {
    setOpenItems((current) => ({
      ...current,
      [id]: !current[id],
    }))
  }

  return (
    <div className="app-shell">
      <div className="glow glow-left" />
      <div className="glow glow-right" />

      <header className="topbar">
        <div className="topbar-brand">
          <img className="topbar-mark" src={brandMark} alt="alnafitha IT brand mark" />
          <div className="topbar-copy">
            <p className="eyebrow">Page Name</p>
            <strong>{currentPage.name}</strong>
          </div>
        </div>

        <nav className="topbar-nav" aria-label="Checklist pages">
          {documentData.pages.map((page) => (
            <button
              key={page.id}
              className={`topbar-link ${page.id === currentPageId ? 'topbar-link-active' : ''}`}
              type="button"
              onClick={() => {
                setCurrentPageId(page.id)
                setOpenItems((current) => ({
                  ...current,
                  [page.checklists[0].id]:
                    current[page.checklists[0].id] ?? true,
                }))
              }}
            >
              {page.name}
            </button>
          ))}
        </nav>
      </header>

      <main className="checklist-page">
        <section className="intro-card">
          <div className="intro-brand">
            <img className="brand-mark" src={brandMark} alt="alnafitha IT brand mark" />
            <div>
              <p className="eyebrow">Presales Checklist</p>
              <h1>{currentPage.name}</h1>
            </div>
          </div>

          <p className="intro-text">{currentPage.intro}</p>

          <div className="intro-meta">
            <span>{documentData.document.department}</span>
            <span>Version {documentData.document.version}</span>
            <span>{documentData.document.last_updated}</span>
          </div>
        </section>

        <section className="accordion-section">
          <div className="section-heading">
            <p className="eyebrow">Checklist Items</p>
            <h2>Click the arrow to display the solution</h2>
          </div>

          <div className="accordion-list">
            {currentPage.checklists.map((checklist) => {
              const isOpen = Boolean(openItems[checklist.id])

              return (
                <article
                  key={checklist.id}
                  className={`accordion-card ${isOpen ? 'accordion-card-open' : ''}`}
                >
                  <button
                    className="accordion-trigger"
                    type="button"
                    onClick={() => toggleItem(checklist.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="accordion-head">
                      <span className="item-id">{checklist.id}</span>
                      <div className="item-copy">
                        <p className="item-line">
                          <span className="item-title">{checklist.title}</span>
                          <span className="item-divider">-</span>
                          <span className="item-description">{checklist.description}</span>
                        </p>
                      </div>
                    </div>

                    <span className={`arrow ${isOpen ? 'arrow-open' : ''}`}>{'>'}</span>
                  </button>

                  {isOpen ? (
                    <div className="accordion-panel">
                      <section className="panel-block">
                        <p className="panel-label">{checklist.solution_title}</p>
                        <ul className="panel-list">
                          {checklist.solution_bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </section>
                    </div>
                  ) : null}
                </article>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
