import { useState } from 'react'
import brandMark from '../docs/assets/alnafitha_brand_mark_generated.png'
import documentData from '../docs/presales_checklist_source.json'
import './App.css'

const versions = [
  { id: 'v1', label: 'V1', name: 'Old Checklist' },
  { id: 'v2', label: 'V2', name: 'Zoho Macro/Micro' },
]

const detailTabs = [
  { id: 'macro', label: 'Macro Data' },
  { id: 'automation', label: 'Automation' },
  { id: 'gate', label: 'Gates' },
  { id: 'output', label: 'Output' },
]

const workflowData = {
  stats: [
    { label: 'Macro Stages', value: '7' },
    { label: 'Views', value: 'Offer + Technical' },
    { label: 'Main Control', value: 'Blueprint Gates' },
    { label: 'Core Output', value: 'Proposal + Quote' },
  ],
  stages: [
    {
      id: 'open-deal',
      no: 1,
      title: 'Open Deal',
      offerTitle: 'Open Deal',
      summary:
        'Create a clean opportunity record and prepare it for qualification, requirement collection, and presales engagement.',
      offerSummary:
        'Every opportunity starts from one controlled Deal record. This avoids scattered information and gives management one place to track progress.',
      module: 'Zoho CRM Deals',
      color: 'primary',
      tags: ['Deal', 'Owner', 'Qualification'],
      micro: [
        {
          title: 'Create Deal',
          type: 'output',
          text: 'Sales creates a Deal with client, business unit, opportunity source, expected value, and expected close date.',
        },
        {
          title: 'Assign Sales Owner',
          type: 'auto',
          text: 'The Deal owner becomes accountable for requirement quality and next follow-up.',
        },
        {
          title: 'Initial Qualification',
          type: 'gate',
          text: 'Deal cannot move forward without minimum qualification data.',
        },
      ],
      automation: [
        'Auto-create internal checklist for new Deal.',
        'Notify sales manager when a high-value Deal is opened.',
        'Set initial SLA timer for requirements collection.',
      ],
      gate: [
        'Mandatory client and opportunity data must be completed.',
        'Deal must have Sales Owner and next activity.',
        'No presales request allowed if Deal is incomplete.',
      ],
      output: [
        'Qualified Deal record',
        'Initial pipeline visibility',
        'Clean starting point for presales',
      ],
    },
    {
      id: 'collect-requirements',
      no: 2,
      title: 'Collect Requirements',
      offerTitle: 'Collect Requirements',
      summary:
        'Sales enters structured requirement data before requesting presales, proposal, or quote support.',
      offerSummary:
        'The sales team captures the client requirement in a structured format so presales can work faster and reduce repeated questions.',
      module: 'Zoho CRM Deals + Requirement Subform',
      color: 'secondary',
      tags: ['Required Data', 'Scope', 'Client Need'],
      micro: [
        {
          title: 'Requirement Data',
          type: 'gate',
          text: 'Sales must enter solution type, scope, modules, timeline, budget, pain points, integration needs, and decision criteria.',
        },
        {
          title: 'Requirement Attachment',
          type: 'output',
          text: 'Upload RFP, drawings, scope file, old proposal, or client email.',
        },
        {
          title: 'Requirement Validation',
          type: 'auto',
          text: 'Blueprint validates that required data is completed before presales engagement.',
        },
      ],
      automation: [
        'When requirements are completed, enable Presales Engagement stage.',
        'If attachment is missing for RFP Deals, notify Deal owner.',
        'Send requirement summary to selected presales channel or project task.',
      ],
      gate: [
        'Cannot move to Presales Engagement without required data.',
        'Cannot create proposal before requirement validation.',
        'Missing budget/timeline triggers manager approval.',
      ],
      output: [
        'Structured client requirement',
        'Ready-to-use data for proposal generation',
        'Reduced sales-presales back and forth',
      ],
    },
    {
      id: 'presales-engagement',
      no: 3,
      title: 'Presales Engagement',
      offerTitle: 'Engage Presales Before Sales Process',
      summary:
        'Add a protected Deal stage before the normal sales process. Sales cannot continue until presales accepts and reviews the requirement.',
      offerSummary:
        'Before sales promises any solution, the request goes to presales. This protects quality, pricing, and delivery feasibility.',
      module: 'Zoho CRM + Zoho Connect / Zoho Projects',
      color: 'purple',
      tags: ['Presales', 'Channel', 'Project Task'],
      micro: [
        {
          title: 'Option 1: Department Channel',
          type: 'auto',
          text: 'Push requirement to Zoho Connect channel based on presales department, such as CRM, Creator, Books, Projects, or Analytics.',
        },
        {
          title: 'Option 2: Zoho Project Task',
          type: 'auto',
          text: 'Create Zoho Projects task linked with the Deal and enquiry/request number.',
        },
        {
          title: 'Presales Acceptance',
          type: 'gate',
          text: 'Presales must accept, reject, or request clarification before the Deal can continue.',
        },
      ],
      automation: [
        'On entering stage, create Connect post or Project task.',
        'Notify selected presales department.',
        'Sync presales status back to Deal.',
        'Create clarification activity if presales asks for more information.',
      ],
      gate: [
        'Deal is locked until presales status is Accepted.',
        'Sales cannot move to proposal or quote before engagement is done.',
        'Rejection requires reason and manager review.',
      ],
      output: [
        'Presales engaged before commitment',
        'Clear responsibility',
        'Technical request traceability',
      ],
    },
    {
      id: 'presales-control',
      no: 4,
      title: 'Presales Activity Control',
      offerTitle: 'Control Presales Activities',
      summary:
        'Every presales stage creates Zoho Projects tasks. The Deal cannot move to the next stage until tasks are closed and time logs are entered.',
      offerSummary:
        'Management can control presales work, task completion, and employee time logs before the Deal moves forward.',
      module: 'Zoho CRM Blueprint + Zoho Projects Tasks + Time Logs',
      color: 'danger',
      tags: ['Task Gate', 'Time Log', 'Blueprint'],
      micro: [
        {
          title: 'Auto Task Creation',
          type: 'auto',
          text: 'When user clicks/enters a stage, a task is created in Zoho Projects with owner, due date, checklist, and Deal reference.',
        },
        {
          title: 'Task Completion Rule',
          type: 'gate',
          text: 'The next Deal transition is blocked until the related Project task is marked Completed.',
        },
        {
          title: 'Time Log Rule',
          type: 'gate',
          text: 'Presales must add time log in Zoho Projects before closing the task.',
        },
      ],
      automation: [
        'Create task on stage entry.',
        'Pull task status from Zoho Projects to CRM.',
        'Pull logged hours to CRM.',
        'Notify manager if SLA is breached.',
        'Unlock next Deal transition only after task + time log are valid.',
      ],
      gate: [
        'Task status must equal Completed.',
        'Logged hours must be greater than 0.',
        'Manager approval required if time exceeds expected hours.',
        'No manual bypass except admin profile.',
      ],
      output: [
        'Controlled presales execution',
        'Employee time visibility',
        'Accurate cost and effort tracking',
      ],
    },
    {
      id: 'professional-services',
      no: 5,
      title: 'Professional Services Sheet',
      offerTitle: 'Calculate Professional Services',
      summary:
        'Create a custom CRM module to calculate implementation, customization, integration, training, support, and PMO effort linked to the Deal.',
      offerSummary:
        'The professional services sheet calculates project effort and service price before the final quote or proposal is generated.',
      module: 'Custom Module: Professional Services Sheet',
      color: 'success',
      tags: ['Costing', 'Custom Module', 'Deal Link'],
      micro: [
        {
          title: 'Service Line Items',
          type: 'output',
          text: 'Add service rows such as discovery, implementation, integration, migration, training, documentation, support, and PMO.',
        },
        {
          title: 'Effort Calculation',
          type: 'auto',
          text: 'Calculate hours, rate, cost, margin, discount, tax, and final selling price.',
        },
        {
          title: 'Approval',
          type: 'gate',
          text: 'Finance/management approval is required when discount or margin is outside the allowed range.',
        },
      ],
      automation: [
        'Calculate totals when service lines change.',
        'Sync approved amount to Deal stage and amount values.',
        'Trigger approval if margin is below threshold.',
        'Create quote/proposal-ready service table.',
      ],
      gate: [
        'Professional Services Sheet must be Approved.',
        'Final amount must be calculated.',
        'Low margin requires approval before quote creation.',
      ],
      output: [
        'Approved professional services costing',
        'Proposal-ready services table',
        'Reliable pricing base',
      ],
    },
    {
      id: 'quote-inventory',
      no: 6,
      title: 'Create Quotes + Inventory Control',
      offerTitle: 'Create Quote and Control Products',
      summary:
        'Generate quotes from CRM and handle inventory/product errors through a controlled update process.',
      offerSummary:
        'Quotes are generated from approved Deal, requirement, and service data. Product or inventory errors follow a controlled correction workflow.',
      module: 'Zoho CRM Quotes + Products + Inventory Error Process',
      color: 'warning',
      tags: ['Quote', 'Inventory', 'Product Fix'],
      micro: [
        {
          title: 'Create Quote',
          type: 'output',
          text: 'Quote is created from Deal data, approved service sheet, selected products, taxes, and commercial terms.',
        },
        {
          title: 'Inventory Error Check',
          type: 'auto',
          text: 'If product, SKU, tax, stock, or price is wrong, create an inventory correction request.',
        },
        {
          title: 'Product Update Process',
          type: 'gate',
          text: 'Inventory/product owner must update the product before quote can be sent.',
        },
      ],
      automation: [
        'Auto-populate quote line items from service sheet and products.',
        'Create correction request when product validation fails.',
        'Notify inventory/product owner.',
        'Recalculate quote after product correction.',
      ],
      gate: [
        'Quote cannot be sent if inventory error is Open.',
        'Quote approval required before client submission.',
        'Expired pricing requires refresh.',
      ],
      output: [
        'Approved quote',
        'Controlled inventory correction',
        'Clean commercial document',
      ],
    },
    {
      id: 'pmo-control',
      no: 7,
      title: 'PMO Request Control',
      offerTitle: 'PMO Request and Journey Control',
      summary:
        'Create a custom PMO module to control delivery requests, email logging, activity tracking, and journey stages connected to the Deal.',
      offerSummary:
        'After proposal and quote movement, PMO controls requests, internal communication, and delivery journey from one module linked to the Deal.',
      module: 'Custom Module: PMO Requests',
      color: 'secondary',
      tags: ['PMO', 'Email Log', 'Journey'],
      micro: [
        {
          title: 'Create PMO Request',
          type: 'output',
          text: 'PMO request is created and linked with Deal, Account, Quote, Proposal, and Project.',
        },
        {
          title: 'Email Activity Logging',
          type: 'auto',
          text: 'Any related email is logged as an activity inside the PMO module and connected back to the Deal.',
        },
        {
          title: 'Custom Journey',
          type: 'gate',
          text: 'PMO journey has its own stages, approvals, SLA, and task rules.',
        },
      ],
      automation: [
        'Create PMO request from Deal transition.',
        'Log related emails to PMO activities.',
        'Sync PMO stage back to Deal.',
        'Create project milestones after handover.',
      ],
      gate: [
        'PMO request must have owner and request type.',
        'Critical requests require approval.',
        'Handover cannot close until PMO checklist is completed.',
      ],
      output: [
        'Controlled request journey',
        'Email and activity traceability',
        'Clean handover to delivery',
      ],
    },
  ],
  macroDesign: [
    {
      stageId: 'open-deal',
      title: 'Open Deal',
      way: ['Open the Deal.'],
      technology: [],
    },
    {
      stageId: 'collect-requirements',
      title: 'Collect Requirements',
      way: ['Collect requirements.', 'Specific fields must be entered.'],
      technology: [],
    },
    {
      stageId: 'presales-engagement',
      title: 'Presales Engagement',
      way: [
        'Add a specific stage before the sales process.',
        'The Deal cannot continue before presales engagement.',
      ],
      technology: [
        'Option 1: Create a channel for each presales department and push the requirement to the correct channel.',
        'Option 2: Create a Zoho Projects task linked to the enquiry.',
        'Use either Zoho Connect for the enquiry or Zoho Projects when sales confirms the request.',
      ],
    },
    {
      stageId: 'presales-control',
      title: 'Presales Activity Control',
      way: [
        'Control presales activity by creating a Zoho Projects task when any stage is clicked or entered.',
      ],
      technology: [
        'Use Blueprint control so each stage creates or controls tasks in Zoho Projects.',
        'The Deal cannot move to the next stage until the task is closed and the time log is entered in Zoho Projects.',
      ],
    },
    {
      stageId: 'professional-services',
      title: 'Professional Services Sheet',
      way: ['Create a full Professional Services calculation sheet.', 'Add a related stage in the Deal.'],
      technology: ['Create a custom module to calculate this and connect it with the Deal.'],
    },
    {
      stageId: 'quote-inventory',
      title: 'Create Quotes + Inventory Control',
      way: ['Create quotes using the same controlled process.'],
      technology: [
        'If an inventory error is found, create a correction process and update the product.',
      ],
    },
    {
      stageId: 'pmo-control',
      title: 'PMO Request Control',
      way: [
        'Create a custom PMO module to control requests.',
        'Log any related email as an activity inside the module and connect it with the Deal.',
        'Create a custom journey and stages.',
      ],
      technology: [],
    },
  ],
  proposalApproach: [
    {
      title: '1. Study Proposal Data',
      text: 'Convert requirement, service costing, quote, and technical notes into structured tables so SmartBrowZ / Catalyst can generate documents faster.',
    },
    {
      title: '2. Build CRM Knowledge Base',
      text: 'Use custom CRM modules to save every reusable section: problem, solution, scope, exclusions, assumptions, timeline, service table, and pricing.',
    },
    {
      title: '3. Generate with SmartBrowZ + Zia',
      text: 'Use Zia Agent AI to select the right library sections, then send JSON to Catalyst/SmartBrowZ to create the final proposal template.',
    },
  ],
}

function App() {
  const [activeVersion, setActiveVersion] = useState('v1')
  const activeVersionMeta = versions.find((version) => version.id === activeVersion) ?? versions[0]

  return (
    <div className="app-shell">
      <div className="glow glow-left" />
      <div className="glow glow-right" />

      <header className="topbar">
        <div className="topbar-brand">
          <img className="topbar-mark" src={brandMark} alt="alnafitha IT brand mark" />
          <div className="topbar-copy">
            <p className="eyebrow">Nav Option</p>
            <strong>{activeVersionMeta.name}</strong>
          </div>
        </div>

        <nav className="topbar-nav" aria-label="Version options">
          {versions.map((version) => (
            <button
              key={version.id}
              className={`topbar-link ${version.id === activeVersion ? 'topbar-link-active' : ''}`}
              type="button"
              onClick={() => setActiveVersion(version.id)}
            >
              <span>{version.label}</span>
              <small>{version.name}</small>
            </button>
          ))}
        </nav>
      </header>

      {activeVersion === 'v1' ? <ChecklistView /> : <MacroMicroView />}
    </div>
  )
}

function ChecklistView() {
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

        <nav className="page-tabs" aria-label="Checklist pages">
          {documentData.pages.map((page) => (
            <button
              key={page.id}
              className={`page-tab ${page.id === currentPageId ? 'page-tab-active' : ''}`}
              type="button"
              onClick={() => {
                setCurrentPageId(page.id)
                setOpenItems((current) => ({
                  ...current,
                  [page.checklists[0].id]: current[page.checklists[0].id] ?? true,
                }))
              }}
            >
              {page.name}
            </button>
          ))}
        </nav>
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
  )
}

function MacroMicroView() {
  const [viewMode, setViewMode] = useState('offer')
  const [selectedStageId, setSelectedStageId] = useState(workflowData.stages[0].id)
  const [selectedTab, setSelectedTab] = useState('macro')
  const selectedStage =
    workflowData.stages.find((stage) => stage.id === selectedStageId) ?? workflowData.stages[0]
  const selectedTitle = viewMode === 'offer' ? selectedStage.offerTitle : selectedStage.title
  const selectedSummary = viewMode === 'offer' ? selectedStage.offerSummary : selectedStage.summary

  return (
    <main className="workflow-page">
      <section className="workflow-hero">
        <div className="workflow-hero-copy">
          <p className="eyebrow">Zoho CRM Design</p>
          <h1>Macro & Micro Stage Design</h1>
          <p>
            A branded stage map for Deal, Requirements, Presales, Professional Services, Quote,
            Proposal Engine, and PMO control.
          </p>
        </div>

        <div className="workflow-switch" aria-label="Workflow view">
          <button
            className={`switch-button ${viewMode === 'offer' ? 'switch-button-active' : ''}`}
            type="button"
            onClick={() => setViewMode('offer')}
          >
            Offer View
          </button>
          <button
            className={`switch-button ${viewMode === 'technical' ? 'switch-button-active' : ''}`}
            type="button"
            onClick={() => setViewMode('technical')}
          >
            Technical View
          </button>
        </div>
      </section>

      <section className="stat-grid" aria-label="Workflow summary">
        {workflowData.stats.map((item) => (
          <article className="stat-card" key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="workflow-section">
        <div className="workflow-section-heading">
          <div>
            <p className="eyebrow">Macro Stages</p>
            <h2>Controlled deal journey</h2>
          </div>
          <span className="workflow-note">
            {viewMode === 'offer'
              ? 'Executive view with high-level business value.'
              : 'Internal view with controls, automation, gates, and outputs.'}
          </span>
        </div>

        <div className="pipeline-wrap">
          <div className="pipeline">
            {workflowData.stages.map((stage) => (
              <button
                key={stage.id}
                className={`stage-card stage-card-${stage.color} ${
                  stage.id === selectedStageId ? 'stage-card-active' : ''
                }`}
                type="button"
                onClick={() => setSelectedStageId(stage.id)}
              >
                <span className={`stage-badge stage-badge-${stage.color}`}>{stage.no}</span>
                <strong>{viewMode === 'offer' ? stage.offerTitle : stage.title}</strong>
                <span>{viewMode === 'offer' ? stage.offerSummary : stage.summary}</span>
                <span className="stage-tags">
                  {stage.tags.map((tag) => (
                    <span className="chip" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="workflow-main-grid">
        <article className="workflow-panel">
          <div className="panel-header">
            <div className="panel-title">
              <p className="eyebrow">Selected Stage</p>
              <h2>{selectedTitle}</h2>
              <small>{selectedStage.module}</small>
            </div>
            <span className="pill output">Macro</span>
          </div>
          <p className="stage-summary">{selectedSummary}</p>

          <div className="micro-list">
            {selectedStage.micro.map((item) => (
              <article className="micro-card" key={item.title}>
                <div className="micro-head">
                  <h3>{item.title}</h3>
                  <span className={`pill ${item.type}`}>{item.type.toUpperCase()}</span>
                </div>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </article>

        <article className="workflow-panel">
          <div className="panel-header">
            <div className="panel-title">
              <p className="eyebrow">Stage Control</p>
              <h2>Implementation Details</h2>
            </div>
          </div>

          <div className="detail-tabs" aria-label="Stage detail tabs">
            {detailTabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${tab.id === selectedTab ? 'tab-button-active' : ''}`}
                type="button"
                onClick={() => setSelectedTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <DetailPanel stage={selectedStage} selectedTab={selectedTab} />
        </article>
      </section>

      <section className="workflow-panel workflow-panel-wide">
        <div className="workflow-section-heading compact">
          <div>
            <p className="eyebrow">Macro Stage Data</p>
            <h2>User Data Only</h2>
          </div>
          <span className="workflow-note">Way + Technology</span>
        </div>

        <div className="macro-design-grid">
          {workflowData.macroDesign.map((item) => (
            <article
              className={`macro-design-card ${
                item.stageId === selectedStageId ? 'macro-design-card-active' : ''
              }`}
              key={item.stageId}
            >
              <h3>{item.title}</h3>
              <InfoGroup title="Way / Approach" items={item.way} />
              {item.technology.length ? <InfoGroup title="Technology" items={item.technology} /> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="workflow-panel workflow-panel-wide">
        <div className="workflow-section-heading compact">
          <div>
            <p className="eyebrow">Proposal Recommendation</p>
            <h2>SmartBrowZ / Catalyst / Zia-ready Journey</h2>
          </div>
        </div>

        <div className="proposal-grid">
          {workflowData.proposalApproach.map((item) => (
            <article className="proposal-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function DetailPanel({ stage, selectedTab }) {
  const macroDesign = workflowData.macroDesign.find((item) => item.stageId === stage.id)

  if (selectedTab === 'macro') {
    return (
      <div className="detail-box">
        {macroDesign ? <InfoGroup title="Way / Approach" items={macroDesign.way} /> : null}
        {macroDesign?.technology.length ? (
          <InfoGroup title="Technology" items={macroDesign.technology} />
        ) : null}
      </div>
    )
  }

  const tabContent = {
    automation: { title: 'Automation Rules', items: stage.automation },
    gate: { title: 'Blueprint / Control Gates', items: stage.gate },
    output: { title: 'Business Output', items: stage.output },
  }[selectedTab]

  return (
    <div className="detail-box">
      <InfoGroup title={tabContent.title} items={tabContent.items} />
    </div>
  )
}

function InfoGroup({ title, items }) {
  return (
    <section className="info-group">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

export default App
