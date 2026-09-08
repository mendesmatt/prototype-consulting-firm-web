(function () {
  'use strict';

  var STORAGE_KEY = 'mm-lang';
  var DEFAULT_LANG = 'fr';
  var SUPPORTED = ['fr', 'en', 'es', 'pt'];
  var LANG_LABELS = { fr: 'FR', en: 'EN', es: 'ES', pt: 'PT' };
  var LANG_FULL = {
    fr: { title: 'Mateus Mendes · Marketing, Design & Développement Web', desc: "Portfolio de Mateus Mendes : marketing, design et développement web." },
    en: { title: 'Mateus Mendes · Marketing, Design & Web Development',   desc: "Mateus Mendes portfolio: marketing, design and web development." },
    es: { title: 'Mateus Mendes · Marketing, Diseño y Desarrollo Web',    desc: "Portafolio de Mateus Mendes: marketing, diseño y desarrollo web." },
    pt: { title: 'Mateus Mendes · Marketing, Design e Desenvolvimento Web', desc: "Portfólio de Mateus Mendes: marketing, design e desenvolvimento web." }
  };

  var DICT = {

    'nav.parcours':  { fr:'Parcours',      en:'About',        es:'Trayectoria',  pt:'Trajetória' },
    'nav.expertise': { fr:'Expertise',     en:'Expertise',    es:'Expertise',    pt:'Expertise' },
    'nav.logiciels': { fr:'Logiciels',     en:'Software',     es:'Software',     pt:'Softwares' },
    'nav.sites':     { fr:'Sites & Apps',  en:'Sites & Apps', es:'Webs y Apps',  pt:'Sites e Apps' },
    'nav.marques':   { fr:'Marques',       en:'Brands',       es:'Marcas',       pt:'Marcas' },
    'nav.demos':     { fr:'Démos',         en:'Demos',        es:'Demos',        pt:'Demos' },
    'nav.contact':   { fr:'Contact',       en:'Contact',      es:'Contacto',     pt:'Contato' },
    'nav.menuOpen':  { fr:'Ouvrir le menu',en:'Open menu',    es:'Abrir el menú',pt:'Abrir o menu' },
    'nav.langLabel': { fr:'Langue',        en:'Language',     es:'Idioma',       pt:'Idioma' },

    'hero.eyebrow':  { fr:'Portfolio', en:'Portfolio', es:'Portafolio', pt:'Portfólio' },
    'hero.role':     {
      fr:'Marketing Specialist <i>·</i> Design <i>·</i> Développement Web',
      en:'Marketing Specialist <i>·</i> Design <i>·</i> Web Development',
      es:'Marketing Specialist <i>·</i> Diseño <i>·</i> Desarrollo Web',
      pt:'Marketing Specialist <i>·</i> Design <i>·</i> Desenvolvimento Web'
    },
    'hero.lede': {
      fr:"Je construis les logiciels, les sites et les applications qui font tourner l'entreprise, avec la même personne qui pense la marque et dessine l'interface. Du produit en production au branding, une seule main.",
      en:"I build the software, sites and apps that run the business, with the same person who thinks the brand and designs the interface. From production product to branding, all under one hand.",
      es:"Construyo los softwares, sitios y aplicaciones que hacen funcionar la empresa, con la misma persona que piensa la marca y diseña la interfaz. Del producto en producción al branding, todo en una sola mano.",
      pt:"Construo os softwares, sites e aplicativos que fazem a empresa girar, com a mesma pessoa que pensa a marca e desenha a interface. Do produto em produção ao branding, tudo em uma só mão."
    },
    'hero.lede.orig': {
      fr:"Je pense la marque comme quelqu'un venu du marketing, et je construis l'interface et le système comme quelqu'un qui programme. Une seule personne, du branding au produit en production.",
      en:"I think the brand like someone who came from marketing, and I build the interface and the system like someone who codes. One person, from branding to shipping product.",
      es:"Pienso la marca como alguien que viene del marketing, y construyo la interfaz y el sistema como alguien que programa. Una sola persona, del branding al producto en producción.",
      pt:"Penso a marca como quem veio do marketing, e construo a interface e o sistema como quem programa. Uma só pessoa, do branding ao produto em produção."
    },
    'hero.ctaProjects': { fr:'Voir les projets', en:'See the projects', es:'Ver los proyectos', pt:'Ver os projetos' },
    'hero.ctaContact':  { fr:'Me contacter',     en:'Get in touch',     es:'Contáctame',        pt:'Fale comigo' },
    'hero.alt':         { fr:'Portrait de Mateus Mendes', en:'Portrait of Mateus Mendes', es:'Retrato de Mateus Mendes', pt:'Retrato de Mateus Mendes' },

    'parcours.label': { fr:'Mon parcours', en:'My path', es:'Mi trayectoria', pt:'Minha trajetória' },
    'parcours.photoAlt': { fr:'Mateus Mendes au travail', en:'Mateus Mendes at work', es:'Mateus Mendes trabajando', pt:'Mateus Mendes trabalhando' },
    'parcours.p1': {
      fr:"J'ai commencé dans le design encore adolescent, de CorelDRAW à Adobe, et c'est ainsi que je suis entré dans le marketing.",
      en:"I started in design as a teenager, from CorelDRAW to Adobe, and that's how I got into marketing.",
      es:"Empecé en el diseño siendo adolescente, del CorelDRAW al Adobe, y así fue como entré en el marketing.",
      pt:"Comecei no design ainda adolescente, do CorelDRAW ao Adobe, e foi assim que entrei no marketing."
    },
    'parcours.p2': {
      fr:"À 18 ans, je dirigeais déjà ma propre agence, et plus tard j'ai piloté la communication et le marketing d'une startup technologique. Le marketing et la présence numérique sont, depuis longtemps, le terrain où je me sens chez moi.",
      en:"At 18 I already ran my own agency, and later led communication and marketing at a tech startup. Marketing and digital presence have long been the ground where I feel at home.",
      es:"A los 18 ya dirigía mi propia agencia, y más tarde lideré la comunicación y el marketing de una startup tecnológica. El marketing y la presencia digital son, desde hace tiempo, el terreno en el que me siento en casa.",
      pt:"Aos 18 anos, eu já dirigia minha própria agência, e mais tarde comandei a comunicação e o marketing de uma startup de tecnologia. O marketing e a presença digital são, há muito tempo, o terreno onde me sinto em casa."
    },
    'parcours.p3': {
      fr:"Au fil des années, j'ai accompagné le client jusqu'où le problème l'exigeait, et cela m'a mené du design et de la campagne vers l'intérieur du produit. Aujourd'hui, chez TechnAvas, je développe les applications et les plateformes web qui font fonctionner ces entreprises.",
      en:"Over the years, I followed each client as far as the problem demanded, and that took me from design and campaigns into the product itself. Today, at TechnAvas, we build the apps and web platforms that make those businesses run.",
      es:"Con los años, acompañé al cliente hasta donde el problema lo exigía, y eso me llevó del diseño y la campaña al interior del producto. Hoy, en TechnAvas, desarrollamos las aplicaciones y plataformas web que hacen funcionar esas empresas.",
      pt:"Ao longo dos anos, acompanhei o cliente até onde o problema exigia, e isso me levou do design e da campanha para dentro do produto. Hoje, na TechnAvas, desenvolvemos os aplicativos e as plataformas web que fazem essas empresas funcionarem."
    },
    'parcours.p4': {
      fr:"L'UX vient avant le code, et le produit naît en pensant à ce qu'il doit générer pour l'entreprise.",
      en:"UX comes before code, and the product is born thinking about what it must generate for the business.",
      es:"El UX viene antes que el código, y el producto nace pensando en lo que debe generar para la empresa.",
      pt:"O UX vem antes do código, e o produto nasce pensando no que ele deve gerar para a empresa."
    },

    'exp.label': { fr:'Ce que je fais', en:'What I do', es:'Lo que hago', pt:'O que eu faço' },
    'exp.intro': {
      fr:"Développement, design et marketing chez une seule personne : je construis le produit qui part en production, je dessine l'interface et je pense la marque qui la porte.",
      en:"Development, design and marketing in one person: I build the product that ships to production, design the interface and think the brand that carries it.",
      es:"Desarrollo, diseño y marketing en una sola persona: construyo el producto que va a producción, diseño la interfaz y pienso la marca que la sostiene.",
      pt:"Desenvolvimento, design e marketing em uma só pessoa: construo o produto que vai para produção, desenho a interface e penso a marca que a sustenta."
    },
    'exp.intro.orig': {
      fr:"Marketing, design et développement chez une seule personne : je pense la marque, je dessine l'interface et je construis le produit qui part en production.",
      en:"Marketing, design and development in one person: I think the brand, design the interface and build the product that ships to production.",
      es:"Marketing, diseño y desarrollo en una sola persona: pienso la marca, diseño la interfaz y construyo el producto que va a producción.",
      pt:"Marketing, design e desenvolvimento em uma só pessoa: penso a marca, desenho a interface e construo o produto que vai para produção."
    },
    'exp.pillar1.title': { fr:'Logiciels & Plateformes', en:'Software & Platforms', es:'Software y Plataformas', pt:'Softwares e Plataformas' },
    'exp.pillar1.desc':  {
      fr:"Des systèmes qui automatisent le contenu, organisent les ventes et font passer l'opération à l'échelle.",
      en:"Systems that automate content, organise sales and take operations to scale.",
      es:"Sistemas que automatizan el contenido, organizan las ventas y llevan la operación a escala.",
      pt:"Sistemas que automatizam o conteúdo, organizam as vendas e levam a operação à escala."
    },
    'exp.pillar1.tags':  { fr:'CRM · Contenu par IA · Planification', en:'CRM · AI content · Planning', es:'CRM · Contenido con IA · Planificación', pt:'CRM · Conteúdo com IA · Planejamento' },

    'exp.pillar2.title': { fr:'Sites & Apps', en:'Sites & Apps', es:'Webs y Apps', pt:'Sites e Apps' },
    'exp.pillar2.desc':  {
      fr:"Applications en Kotlin et sites de bout en bout, du parcours UX à l'interface.",
      en:"Kotlin apps and end-to-end sites, from UX flow to interface.",
      es:"Aplicaciones en Kotlin y sitios de punta a punta, del flujo UX a la interfaz.",
      pt:"Aplicativos em Kotlin e sites de ponta a ponta, do fluxo UX à interface."
    },
    'exp.pillar2.tags':  { fr:'Apps mobiles · Sites · E-commerce', en:'Mobile apps · Websites · E-commerce', es:'Apps móviles · Sitios · E-commerce', pt:'Apps mobile · Sites · E-commerce' },

    'exp.pillar3.title': { fr:'Marques & Réseaux Sociaux', en:'Brands & Social Media', es:'Marcas y Redes Sociales', pt:'Marcas e Redes Sociais' },
    'exp.pillar3.desc':  {
      fr:"Identité, direction artistique et contenu pour que la marque existe avant le budget média.",
      en:"Identity, art direction and content so the brand exists before the media budget.",
      es:"Identidad, dirección de arte y contenido para que la marca exista antes del presupuesto de medios.",
      pt:"Identidade, direção de arte e conteúdo para que a marca exista antes do orçamento de mídia."
    },
    'exp.pillar3.tags':  { fr:'Branding · Social media · Campagnes', en:'Branding · Social media · Campaigns', es:'Branding · Social media · Campañas', pt:'Branding · Social media · Campanhas' },

    'ai.title': { fr:"Maîtrise de l'IA", en:'AI mastery', es:'Dominio de la IA', pt:'Domínio da IA' },
    'ai.desc':  {
      fr:"Gemini, Claude et APIs officielles (Google Places, YouTube) intégrés à mes produits pour automatiser des tâches et gagner en échelle.",
      en:"Gemini, Claude and official APIs (Google Places, YouTube) built into my products to automate tasks and scale.",
      es:"Gemini, Claude y APIs oficiales (Google Places, YouTube) integrados a mis productos para automatizar tareas y escalar.",
      pt:"Gemini, Claude e APIs oficiais (Google Places, YouTube) integrados aos meus produtos para automatizar tarefas e ganhar escala."
    },

    'div.logiciels.title': { fr:'Logiciels', en:'Software', es:'Software', pt:'Softwares' },
    'div.logiciels.lede':  {
      fr:"Systèmes et plateformes que nous développons pour automatiser la production de contenu, organiser les ventes et faire passer les opérations à l'échelle.",
      en:"Systems and platforms we build to automate content production, organise sales and take operations to scale.",
      es:"Sistemas y plataformas que desarrollamos para automatizar la producción de contenido, organizar las ventas y llevar las operaciones a escala.",
      pt:"Sistemas e plataformas que desenvolvemos para automatizar a produção de conteúdo, organizar as vendas e levar as operações à escala."
    },
    'div.sites.title': { fr:'Sites & Apps', en:'Sites & Apps', es:'Webs y Apps', pt:'Sites e Apps' },
    'div.sites.lede':  {
      fr:"Applications en Kotlin et sites conçus de bout en bout, du parcours UX à l'interface finale.",
      en:"Kotlin apps and sites designed end-to-end, from UX flow to the final interface.",
      es:"Aplicaciones en Kotlin y sitios diseñados de punta a punta, del flujo UX a la interfaz final.",
      pt:"Aplicativos em Kotlin e sites concebidos de ponta a ponta, do fluxo UX à interface final."
    },
    'div.marques.title': { fr:'Marques &<br>Réseaux Sociaux', en:'Brands &<br>Social Media', es:'Marcas y<br>Redes Sociales', pt:'Marcas e<br>Redes Sociais' },
    'div.marques.lede':  {
      fr:"Identité, direction artistique et contenu pour des entreprises qui devaient exister dans l'esprit du public avant d'exister dans le budget média.",
      en:"Identity, art direction and content for companies that had to exist in people's minds before they existed in the media budget.",
      es:"Identidad, dirección de arte y contenido para empresas que debían existir en la mente del público antes que en el presupuesto de medios.",
      pt:"Identidade, direção de arte e conteúdo para empresas que precisavam existir na mente do público antes de existir no orçamento de mídia."
    },

    'meta.scope':   { fr:'Périmètre', en:'Scope',    es:'Alcance', pt:'Escopo' },
    'meta.year':    { fr:'Année',     en:'Year',     es:'Año',     pt:'Ano' },
    'meta.sector':  { fr:'Secteur',   en:'Sector',   es:'Sector',  pt:'Setor' },
    'meta.problem': { fr:'Problème',  en:'Problem',  es:'Problema',pt:'Problema' },
    'meta.process': { fr:'Processus', en:'Process',  es:'Proceso', pt:'Processo' },
    'meta.result':  { fr:'Résultat',  en:'Result',   es:'Resultado',pt:'Resultado' },

    'crm.stack': {
      fr:"Plateforme multi-entreprises en React, Tailwind et Firebase, avec pipeline kanban (dnd-kit) et prospection autonome via Gemini et Claude.",
      en:"Multi-company platform in React, Tailwind and Firebase, with kanban pipeline (dnd-kit) and autonomous prospecting via Gemini and Claude.",
      es:"Plataforma multiempresa en React, Tailwind y Firebase, con pipeline kanban (dnd-kit) y prospección autónoma vía Gemini y Claude.",
      pt:"Plataforma multiempresa em React, Tailwind e Firebase, com pipeline kanban (dnd-kit) e prospecção autônoma via Gemini e Claude."
    },
    'crm.problem': {
      fr:"Plusieurs entreprises et sociétés gérées sur des feuilles éparses, sans vue du pipeline ni méthode de prospection.",
      en:"Several companies and businesses run on scattered spreadsheets, with no pipeline view or prospecting method.",
      es:"Varias empresas y sociedades gestionadas en hojas dispersas, sin vista del pipeline ni método de prospección.",
      pt:"Várias empresas e negócios geridos em planilhas dispersas, sem visão de pipeline nem método de prospecção."
    },
    'crm.process': {
      fr:"Un seul tableau de bord par entreprise, avec pipeline kanban et prospection qui puise dans Google Places et filtre par quartier, ville et secteur.",
      en:"A single dashboard per company, with kanban pipeline and prospecting that pulls from Google Places and filters by neighbourhood, city and sector.",
      es:"Un solo panel por empresa, con pipeline kanban y prospección que se nutre de Google Places y filtra por barrio, ciudad y sector.",
      pt:"Um único painel por empresa, com pipeline kanban e prospecção que puxa do Google Places e filtra por bairro, cidade e setor."
    },
    'crm.result': {
      fr:"Un seul écran pour gérer toutes les marques et générer des leads qualifiés seul, sans listes achetées.",
      en:"One screen to run every brand and generate qualified leads on my own, no purchased lists.",
      es:"Una sola pantalla para gestionar todas las marcas y generar leads calificados por cuenta propia, sin listas compradas.",
      pt:"Uma única tela para gerir todas as marcas e gerar leads qualificados por conta própria, sem listas compradas."
    },
    'crm.alt1': { fr:'Tableau de bord du CRM', en:'CRM dashboard', es:'Panel del CRM', pt:'Painel do CRM' },
    'crm.alt2': { fr:'Liste de leads du CRM', en:'CRM lead list', es:'Lista de leads del CRM', pt:'Lista de leads do CRM' },

    'designer.stack': {
      fr:"Générateur de visuels en HTML5 Canvas et JavaScript pur, avec back-end PHP propre et Gemini intégré. Exporte feed et story prêts.",
      en:"Visual generator in HTML5 Canvas and pure JavaScript, with a clean PHP back-end and Gemini built in. Exports ready-to-post feed and story.",
      es:"Generador de visuales en HTML5 Canvas y JavaScript puro, con back-end PHP propio y Gemini integrado. Exporta feed y story listos.",
      pt:"Gerador de artes em HTML5 Canvas e JavaScript puro, com back-end PHP próprio e Gemini integrado. Exporta feed e story prontos."
    },
    'designer.problem': {
      fr:"Sur le compte d'un journal, chaque visuel exigeait de choisir une image, lire l'article, réécrire titre et légende et monter deux formats sur Photoshop, Illustrator et Canva.",
      en:"On a newspaper account, every visual required picking an image, reading the article, rewriting title and caption and building two formats across Photoshop, Illustrator and Canva.",
      es:"En la cuenta de un periódico, cada visual exigía elegir imagen, leer el artículo, reescribir título y pie y armar dos formatos en Photoshop, Illustrator y Canva.",
      pt:"Na conta de um jornal, cada arte exigia escolher imagem, ler a matéria, reescrever título e legenda e montar dois formatos em Photoshop, Illustrator e Canva."
    },
    'designer.process': {
      fr:"Des gabarits standardisés en deux grilles, feed et story. Vous collez le lien ou écrivez le thème et l'IA génère titre, description et légende Instagram déjà avec hashtags.",
      en:"Standardised templates in two grids, feed and story. Paste the link or write the topic and AI generates title, description and Instagram caption already with hashtags.",
      es:"Plantillas estandarizadas en dos grillas, feed y story. Pegas el enlace o escribes el tema y la IA genera título, descripción y pie de Instagram ya con hashtags.",
      pt:"Modelos padronizados em duas grades, feed e story. Cola o link ou escreve o tema e a IA gera título, descrição e legenda de Instagram já com hashtags."
    },
    'designer.result': {
      fr:"Ce qui prenait plusieurs étapes et trois logiciels se règle désormais en moins d'une minute.",
      en:"What used to take several steps and three tools now takes under a minute.",
      es:"Lo que llevaba varias etapas y tres programas ahora se resuelve en menos de un minuto.",
      pt:"O que levava várias etapas e três programas agora se resolve em menos de um minuto."
    },
    'designer.alt1': { fr:'Interface du générateur DesignerAvas', en:'DesignerAvas generator interface', es:'Interfaz del generador DesignerAvas', pt:'Interface do gerador DesignerAvas' },
    'designer.alt2': { fr:'Panneau d\'export feed et story', en:'Feed and story export panel', es:'Panel de exportación feed y story', pt:'Painel de exportação feed e story' },

    'tube.stack': {
      fr:"Planificateur et publicateur YouTube en HTML, CSS et JS, avec Gemini et l'API officielle de Google. Publie sans quitter la plateforme.",
      en:"YouTube planner and publisher in HTML, CSS and JS, with Gemini and Google's official API. Publishes without leaving the platform.",
      es:"Planificador y publicador de YouTube en HTML, CSS y JS, con Gemini y la API oficial de Google. Publica sin salir de la plataforma.",
      pt:"Planejador e publicador de YouTube em HTML, CSS e JS, com Gemini e a API oficial do Google. Publica sem sair da plataforma."
    },
    'tube.problem': {
      fr:"Un journal avec une chaîne de 2 440 abonnés voulait monétiser, mais YouTube Studio ne planifiait ni le contenu ni les heures vers l'objectif.",
      en:"A newspaper with a 2,440-subscriber channel wanted to monetise, but YouTube Studio planned neither content nor hours toward the target.",
      es:"Un periódico con un canal de 2.440 suscriptores quería monetizar, pero YouTube Studio no planificaba ni el contenido ni las horas hacia el objetivo.",
      pt:"Um jornal com um canal de 2.440 inscritos queria monetizar, mas o YouTube Studio não planejava nem o conteúdo nem as horas rumo ao objetivo."
    },
    'tube.process': {
      fr:"Croise les rapports de vues et de croissance, planifie le contenu et le minutage, génère titre et description avec l'IA et publie via l'API de Google.",
      en:"Cross-references view and growth reports, plans content and timing, generates title and description with AI and publishes via Google's API.",
      es:"Cruza los informes de vistas y crecimiento, planifica el contenido y los tiempos, genera título y descripción con IA y publica vía API de Google.",
      pt:"Cruza os relatórios de views e crescimento, planeja o conteúdo e o timing, gera título e descrição com IA e publica via API do Google."
    },
    'tube.result': {
      fr:"Suit les 4 000 heures en un an exigées pour monétiser, le tout dans un seul onglet, avec plus de concentration et de productivité.",
      en:"Tracks the 4,000 hours in a year required to monetise, all in one tab, with more focus and productivity.",
      es:"Sigue las 4.000 horas en un año exigidas para monetizar, todo en una sola pestaña, con más concentración y productividad.",
      pt:"Acompanha as 4.000 horas em um ano exigidas para monetizar, tudo em uma única aba, com mais foco e produtividade."
    },
    'tube.alt1': { fr:'Agenda de la chaîne dans TubeMetric', en:'Channel calendar in TubeMetric', es:'Agenda del canal en TubeMetric', pt:'Agenda do canal no TubeMetric' },
    'tube.alt2': { fr:"Programmation d'une vidéo", en:'Scheduling a video', es:'Programación de un video', pt:'Agendamento de um vídeo' },

    'ins.title': { fr:"Site et App · Courtage d'assurance", en:'Site and App · Insurance brokerage', es:'Web y App · Corretaje de seguros', pt:'Site e App · Corretora de seguros' },
    'ins.desc': {
      fr:"Site en HTML, CSS et JavaScript qui capte des leads en temps réel, en les enregistrant directement dans un tableur via Google Apps Script. L'application, en Kotlin, est en marque blanche et intègre les assureurs via une API propre, avec souscription instantanée pour une partie des branches et alertes de renouvellement.",
      en:"Site in HTML, CSS and JavaScript that captures leads in real time, saving them straight into a spreadsheet via Google Apps Script. The Kotlin app is white-label and integrates insurers through a proprietary API, with instant underwriting for some lines and renewal alerts.",
      es:"Sitio en HTML, CSS y JavaScript que capta leads en tiempo real, guardándolos directamente en una hoja de cálculo vía Google Apps Script. La app, en Kotlin, es marca blanca e integra a las aseguradoras mediante una API propia, con contratación instantánea para parte de los ramos y alertas de renovación.",
      pt:"Site em HTML, CSS e JavaScript que capta leads em tempo real, salvando direto em uma planilha via Google Apps Script. O aplicativo, em Kotlin, é white-label e integra as seguradoras por uma API própria, com contratação instantânea para parte dos ramos e alertas de renovação."
    },
    'ins.stack': { fr:'HTML · CSS · JavaScript · Kotlin · Google Apps Script', en:'HTML · CSS · JavaScript · Kotlin · Google Apps Script', es:'HTML · CSS · JavaScript · Kotlin · Google Apps Script', pt:'HTML · CSS · JavaScript · Kotlin · Google Apps Script' },
    'ins.alt1': { fr:"Site de cotation du courtier d'assurance", en:'Insurance broker quoting site', es:'Sitio de cotización del corredor de seguros', pt:'Site de cotação da corretora de seguros' },
    'ins.alt2': { fr:"Application mobile du courtier d'assurance", en:'Insurance broker mobile app', es:'App móvil del corredor de seguros', pt:'App móvel da corretora de seguros' },

    'skate.title': { fr:'App · École de patinage', en:'App · Skating school', es:'App · Escuela de patinaje', pt:'App · Escola de patinação' },
    'skate.desc': {
      fr:"Application développée en Kotlin pour une école de patinage, avec agenda des cours et des événements, espace financier (mensualité, Pix et carte récurrente), réservation de patins par pointure et suivi de la progression des élèves.",
      en:"Kotlin app for a skating school, with class and event calendar, financial area (monthly fee, Pix and recurring card), skate booking by size and student progress tracking.",
      es:"App en Kotlin para una escuela de patinaje, con agenda de clases y eventos, área financiera (mensualidad, Pix y tarjeta recurrente), reserva de patines por talla y seguimiento del avance de los alumnos.",
      pt:"App em Kotlin para uma escola de patinação, com agenda de aulas e eventos, área financeira (mensalidade, Pix e cartão recorrente), reserva de patins por numeração e acompanhamento da evolução dos alunos."
    },
    'skate.stack': { fr:'Kotlin · Paiements récurrents · Réservation', en:'Kotlin · Recurring payments · Booking', es:'Kotlin · Pagos recurrentes · Reservas', pt:'Kotlin · Pagamentos recorrentes · Reservas' },
    'skate.alt1': { fr:"Écran d'accueil de l'app de patinage", en:'Skating app home screen', es:'Pantalla de inicio de la app de patinaje', pt:'Tela inicial do app de patinação' },
    'skate.alt2': { fr:"Espace financier de l'app", en:'Financial area in the app', es:'Área financiera de la app', pt:'Área financeira do app' },
    'skate.alt3': { fr:'Réservation de patins par pointure', en:'Skate booking by size', es:'Reserva de patines por talla', pt:'Reserva de patins por numeração' },

    'shop.title': { fr:'Site · Épicerie', en:'Site · Grocery store', es:'Web · Tienda gourmet', pt:'Site · Empório' },
    'shop.desc': {
      fr:"Site e-commerce pour une épicerie bio, avec catalogue saisonnier, vitrine de produits et commande directe par le client.",
      en:"E-commerce site for an organic grocery, with seasonal catalogue, product showcase and direct customer ordering.",
      es:"Sitio e-commerce para una tienda gourmet bio, con catálogo estacional, escaparate de productos y pedido directo por el cliente.",
      pt:"Site e-commerce para um empório orgânico, com catálogo sazonal, vitrine de produtos e pedido direto pelo cliente."
    },
    'shop.stack': { fr:'E-commerce · Catalogue · Commande en ligne', en:'E-commerce · Catalogue · Online ordering', es:'E-commerce · Catálogo · Pedido en línea', pt:'E-commerce · Catálogo · Pedido online' },
    'shop.alt': { fr:"Boutique en ligne de l'épicerie", en:'Grocery online store', es:'Tienda online de la tienda gourmet', pt:'Loja online do empório' },

    'gann.scope': { fr:'Réseaux sociaux', en:'Social media', es:'Redes sociales', pt:'Redes sociais' },
    'gann.sector': { fr:'Finance', en:'Finance', es:'Finanzas', pt:'Finanças' },
    'gann.desc': {
      fr:"Contenu et direction artistique pour un cabinet de conseil en investissement, traduisant le marché financier en publications qui inspirent confiance.",
      en:"Content and art direction for an investment advisory firm, translating the financial market into posts that inspire trust.",
      es:"Contenido y dirección de arte para una consultora de inversiones, traduciendo el mercado financiero en publicaciones que inspiran confianza.",
      pt:"Conteúdo e direção de arte para uma consultoria de investimentos, traduzindo o mercado financeiro em publicações que inspiram confiança."
    },
    'gann.alt1': { fr:'Publication Gann Capital : 3 meilleurs investissements', en:'Gann Capital post: top 3 investments', es:'Publicación Gann Capital: 3 mejores inversiones', pt:'Publicação Gann Capital: 3 melhores investimentos' },
    'gann.alt2': { fr:'Publication Gann Capital : prise de rendez-vous', en:'Gann Capital post: book a meeting', es:'Publicación Gann Capital: agendar reunión', pt:'Publicação Gann Capital: agendar reunião' },

    'ana.scope':  { fr:'Identité et social', en:'Identity and social', es:'Identidad y social', pt:'Identidade e social' },
    'ana.sector': { fr:'Thérapies / Constellation', en:'Therapies / Constellation', es:'Terapias / Constelación', pt:'Terapias / Constelação' },
    'ana.quote': {
      fr:"Une marque pour parler de douleur et de renouveau sans paraître clinique ni mystique.",
      en:"A brand to speak of pain and renewal without feeling clinical or mystical.",
      es:"Una marca para hablar de dolor y renovación sin sonar clínica ni mística.",
      pt:"Uma marca para falar de dor e renovação sem parecer clínica nem mística."
    },
    'ana.desc': {
      fr:"Identité et contenu pour une praticienne en constellations, communiquant des processus émotionnels sans cliché spirituel ni froideur clinique.",
      en:"Identity and content for a constellation practitioner, communicating emotional processes without spiritual cliché or clinical coldness.",
      es:"Identidad y contenido para una practicante en constelaciones, comunicando procesos emocionales sin cliché espiritual ni frialdad clínica.",
      pt:"Identidade e conteúdo para uma consteladora, comunicando processos emocionais sem clichê espiritual nem frieza clínica."
    },
    'ana.altHero': { fr:'Ana Sillos, praticienne en constellations', en:'Ana Sillos, constellation practitioner', es:'Ana Sillos, practicante en constelaciones', pt:'Ana Sillos, consteladora' },
    'ana.altPost': { fr:'Publication Ana Sillos', en:'Ana Sillos post', es:'Publicación Ana Sillos', pt:'Publicação Ana Sillos' },

    'med.scope':  { fr:'Réseaux sociaux', en:'Social media', es:'Redes sociales', pt:'Redes sociais' },
    'med.sector': { fr:'Clinique médicale', en:'Medical clinic', es:'Clínica médica', pt:'Clínica médica' },
    'med.desc': {
      fr:"Contenu santé pour une clinique médicale, alliant information fiable et langage accessible au patient.",
      en:"Health content for a medical clinic, blending reliable information with patient-friendly language.",
      es:"Contenido de salud para una clínica médica, combinando información fiable y lenguaje accesible al paciente.",
      pt:"Conteúdo de saúde para uma clínica médica, aliando informação confiável e linguagem acessível ao paciente."
    },
    'med.alt1': { fr:'Publication MedViana : prévention', en:'MedViana post: prevention', es:'Publicación MedViana: prevención', pt:'Publicação MedViana: prevenção' },
    'med.alt2': { fr:'Publication MedViana : symptômes', en:'MedViana post: symptoms', es:'Publicación MedViana: síntomas', pt:'Publicação MedViana: sintomas' },
    'med.alt3': { fr:'Publication MedViana : équipe', en:'MedViana post: team', es:'Publicación MedViana: equipo', pt:'Publicação MedViana: equipe' },

    'paola.scope':  { fr:'Réseaux sociaux', en:'Social media', es:'Redes sociales', pt:'Redes sociais' },
    'paola.sector': { fr:'Médecin dermatologue', en:'Dermatologist', es:'Médica dermatóloga', pt:'Médica dermatologista' },
    'paola.quote': {
      fr:"Esthétique éditoriale pour positionner la dermatologie sur le segment premium.",
      en:"Editorial aesthetic to position dermatology in the premium segment.",
      es:"Estética editorial para posicionar la dermatología en el segmento premium.",
      pt:"Estética editorial para posicionar a dermatologia no segmento premium."
    },
    'paola.desc': {
      fr:"Direction artistique et contenu pour une dermatologue, avec une typographie éditoriale qui donne une allure sophistiquée à chaque campagne.",
      en:"Art direction and content for a dermatologist, with editorial typography that lends a sophisticated look to every campaign.",
      es:"Dirección de arte y contenido para una dermatóloga, con tipografía editorial que da un aire sofisticado a cada campaña.",
      pt:"Direção de arte e conteúdo para uma dermatologista, com tipografia editorial que dá um ar sofisticado a cada campanha."
    },
    'paola.altHero': { fr:'Dr. Paola, dermatologue', en:'Dr. Paola, dermatologist', es:'Dra. Paola, dermatóloga', pt:'Dra. Paola, dermatologista' },
    'paola.alt1': { fr:'Campagne Dr. Paola', en:'Dr. Paola campaign', es:'Campaña Dra. Paola', pt:'Campanha Dra. Paola' },
    'paola.alt2': { fr:'Campagne Dr. Paola : skincare', en:'Dr. Paola campaign: skincare', es:'Campaña Dra. Paola: skincare', pt:'Campanha Dra. Paola: skincare' },
    'paola.alt3': { fr:'Campagne Dr. Paola : collagène', en:'Dr. Paola campaign: collagen', es:'Campaña Dra. Paola: colágeno', pt:'Campanha Dra. Paola: colágeno' },

    'helpers.scope':  { fr:'Direction Marketing', en:'Marketing Direction', es:'Dirección de Marketing', pt:'Direção de Marketing' },
    'helpers.sector': { fr:'Application de livraison', en:'Delivery application', es:'Aplicación de entregas', pt:'Aplicativo de delivery' },
    'helpers.desc': {
      fr:"Direction de la communication et du marketing lors du lancement de l'app, du rebranding à la stratégie approuvée par les investisseurs providentiels.",
      en:"Led communication and marketing at the app launch, from rebranding to the strategy approved by angel investors.",
      es:"Dirección de comunicación y marketing en el lanzamiento de la app, del rebranding a la estrategia aprobada por los inversores ángeles.",
      pt:"Direção de comunicação e marketing no lançamento do app, do rebranding à estratégia aprovada pelos investidores-anjo."
    },
    'helpers.alt1': { fr:'Mascotte Helpers Delivery', en:'Helpers Delivery mascot', es:'Mascota Helpers Delivery', pt:'Mascote Helpers Delivery' },
    'helpers.alt2': { fr:'Campagne de lancement Helpers', en:'Helpers launch campaign', es:'Campaña de lanzamiento Helpers', pt:'Campanha de lançamento Helpers' },
    'helpers.alt3': { fr:'Lancement Helpers à Fortaleza', en:'Helpers launch in Fortaleza', es:'Lanzamiento Helpers en Fortaleza', pt:'Lançamento Helpers em Fortaleza' },

    'divers.title': { fr:'Divers', en:'Various', es:'Varios', pt:'Diversos' },
    'divers.quote': {
      fr:"Un aperçu des marques passées entre nos mains au fil des années.",
      en:"A glimpse of the brands that passed through our hands over the years.",
      es:"Un vistazo a las marcas que pasaron por nuestras manos a lo largo de los años.",
      pt:"Um recorte das marcas que passaram pelas nossas mãos ao longo dos anos."
    },
    'divers.desc': {
      fr:"De la gastronomie au commerce et aux services, des dizaines de marques accompagnées en social et en design au cours de la dernière décennie.",
      en:"From gastronomy to commerce and services, dozens of brands supported in social and design over the past decade.",
      es:"De la gastronomía al comercio y a los servicios, decenas de marcas acompañadas en social y diseño durante la última década.",
      pt:"Da gastronomia ao comércio e aos serviços, dezenas de marcas acompanhadas em social e design ao longo da última década."
    },
    'divers.alt': { fr:'Projet social media', en:'Social media project', es:'Proyecto social media', pt:'Projeto social media' },

    'live.label': { fr:'En ligne', en:'Live', es:'En línea', pt:'No ar' },
    'live.title': {
      fr:'Découvrez tous les projets, en direct',
      en:'Explore every project, live',
      es:'Descubre todos los proyectos, en vivo',
      pt:'Conheça todos os projetos, ao vivo'
    },
    'live.lede': {
      fr:"Une sélection de prototypes livrés et navigables. Chaque vignette est un aperçu réel du projet. Cliquez pour ouvrir la démo interactive dans un nouvel onglet.",
      en:"A selection of shipped, navigable prototypes. Each tile is a real preview of the project. Click to open the interactive demo in a new tab.",
      es:"Una selección de prototipos entregados y navegables. Cada miniatura es una vista real del proyecto. Haz clic para abrir la demo interactiva en una pestaña nueva.",
      pt:"Uma seleção de protótipos entregues e navegáveis. Cada miniatura é uma prévia real do projeto. Clique para abrir a demo interativa em uma nova aba."
    },
    'live.go':   { fr:'Voir en direct', en:'View live', es:'Ver en vivo', pt:'Ver no ar' },
    'live.previewAlt': { fr:'Aperçu du projet', en:'Project preview', es:'Vista del proyecto', pt:'Prévia do projeto' },

    'tag.insurance':  { fr:'Assurance',   en:'Insurance',   es:'Seguros',      pt:'Seguros' },
    'tag.barber':     { fr:'Barbershop',  en:'Barbershop',  es:'Barbería',     pt:'Barbearia' },
    'tag.beauty':     { fr:'Beauté',      en:'Beauty',      es:'Belleza',      pt:'Beleza' },
    'tag.creative':   { fr:'Création',    en:'Creative',    es:'Creación',     pt:'Criação' },
    'tag.health':     { fr:'Santé',       en:'Health',      es:'Salud',        pt:'Saúde' },
    'tag.grocery':    { fr:'Épicerie',    en:'Grocery',     es:'Tienda gourmet', pt:'Empório' },
    'tag.wellness':   { fr:'Bien-être',   en:'Wellness',    es:'Bienestar',    pt:'Bem-estar' },
    'tag.realestate': { fr:'Immobilier',  en:'Real estate', es:'Inmobiliario', pt:'Imobiliário' },
    'tag.nutrition':  { fr:'Nutrition',   en:'Nutrition',   es:'Nutrición',    pt:'Nutrição' },
    'tag.construction':{fr:'Construction',en:'Construction',es:'Construcción', pt:'Construção' },
    'tag.vet':        { fr:'Vétérinaire', en:'Veterinary',  es:'Veterinaria',  pt:'Veterinária' },

    'proj.insurance':  { fr:"Courtage d'assurance", en:'Insurance brokerage', es:'Corretaje de seguros', pt:'Corretora de seguros' },
    'proj.barber':     { fr:'Barber & Co', en:'Barber & Co', es:'Barber & Co', pt:'Barber & Co' },
    'proj.hair':       { fr:'Salon de coiffure', en:'Hair salon', es:'Salón de peluquería', pt:'Salão de cabeleireiro' },
    'proj.canva':      { fr:'Éditeur de visuels', en:'Visual editor', es:'Editor de visuales', pt:'Editor de artes' },
    'proj.clinic':     { fr:'Clinique médicale', en:'Medical clinic', es:'Clínica médica', pt:'Clínica médica' },
    'proj.epicerie':   { fr:'Épicerie fine', en:'Fine grocery', es:'Tienda gourmet', pt:'Empório fino' },
    'proj.speech':     { fr:'Orthophonie', en:'Speech therapy', es:'Fonoaudiología', pt:'Fonoaudiologia' },
    'proj.slim':       { fr:'Programme minceur', en:'Slimming programme', es:'Programa para adelgazar', pt:'Programa de emagrecimento' },
    'proj.realestate': { fr:'Immobilier haut de gamme', en:'High-end real estate', es:'Inmobiliaria de alta gama', pt:'Imobiliária de alto padrão' },
    'proj.kaze':       { fr:'Kaze · Épicerie japonaise', en:'Kaze · Japanese grocery', es:'Kaze · Tienda japonesa', pt:'Kaze · Empório japonês' },
    'proj.nutri':      { fr:'Suivi nutritionnel', en:'Nutrition tracking', es:'Seguimiento nutricional', pt:'Acompanhamento nutricional' },
    'proj.rb':         { fr:'RB Solutions', en:'RB Solutions', es:'RB Solutions', pt:'RB Solutions' },
    'proj.vet':        { fr:'Clinique vétérinaire', en:'Veterinary clinic', es:'Clínica veterinaria', pt:'Clínica veterinária' },

    'contact.label': { fr:'Contact', en:'Contact', es:'Contacto', pt:'Contato' },
    'contact.title': { fr:'Merci', en:'Thank you', es:'Gracias', pt:'Obrigado' },
    'contact.lede': {
      fr:"Merci d'être arrivé jusqu'ici. Parlons du prochain projet.",
      en:"Thanks for making it this far. Let's talk about the next project.",
      es:"Gracias por llegar hasta aquí. Hablemos del próximo proyecto.",
      pt:"Obrigado por chegar até aqui. Vamos conversar sobre o próximo projeto."
    },
    'contact.phoneK': { fr:'Téléphone', en:'Phone', es:'Teléfono', pt:'Telefone' },
    'contact.webK':   { fr:'Web',       en:'Web',   es:'Web',      pt:'Web' },
    'contact.foot1':  { fr:'Mateus Mendes', en:'Mateus Mendes', es:'Mateus Mendes', pt:'Mateus Mendes' },
    'contact.foot2':  { fr:'Marketing · Design · Développement', en:'Marketing · Design · Development', es:'Marketing · Diseño · Desarrollo', pt:'Marketing · Design · Desenvolvimento' },

    'lb.close': { fr:'Fermer', en:'Close', es:'Cerrar', pt:'Fechar' }
  };

  function detectLang() {
    try {
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (e) {  }
    var nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : DEFAULT_LANG;
  }

  function translate(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var entry = DICT[key];
      if (!entry) return;
      var val = entry[lang] || entry[DEFAULT_LANG];

      if (val.indexOf('<') !== -1) el.innerHTML = val;
      else el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      var spec = el.getAttribute('data-i18n-attr');
      spec.split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length !== 2) return;
        var attr = parts[0].trim();
        var key  = parts[1].trim();
        var entry = DICT[key];
        if (!entry) return;
        el.setAttribute(attr, entry[lang] || entry[DEFAULT_LANG]);
      });
    });

    var meta = LANG_FULL[lang];
    document.title = meta.title;
    var m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', meta.desc);

    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-lang-btn') === lang);
    });
    var current = document.getElementById('langCurrent');
    if (current) current.textContent = LANG_LABELS[lang];

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {  }
  }

  window.MMI18N = {
    init: function () {
      translate(detectLang());

      document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          translate(btn.getAttribute('data-lang-btn'));
          var picker = document.getElementById('langPicker');
          if (picker) picker.classList.remove('is-open');
        });
      });
    },
    supported: SUPPORTED,
    labels: LANG_LABELS
  };
})();

(function () {
  'use strict';

  var supportedLangs = ['fr', 'pt', 'es', 'en'];

  function applyLanguage(lang) {
    if (!lang) return;
    lang = lang.toLowerCase();

    try {
      localStorage.setItem('user_lang_pref', lang);
      localStorage.setItem('lang', lang);
      localStorage.setItem('mm_lang', lang);
    } catch (e) {}

    var cur = document.getElementById('langCurrent');
    if (cur) cur.textContent = lang.toUpperCase();

    if (window.MMI18N) {
      if (typeof window.MMI18N.set === 'function') window.MMI18N.set(lang);
      else if (typeof window.MMI18N.setLang === 'function') window.MMI18N.setLang(lang);
      else if (typeof window.MMI18N.apply === 'function') window.MMI18N.apply(lang);
      else if (typeof window.MMI18N.changeLanguage === 'function') window.MMI18N.changeLanguage(lang);
    }

    var menuBtns = document.querySelectorAll('.lang__menu [data-lang-btn]');
    menuBtns.forEach(function (b) {
      if (b.getAttribute('data-lang-btn') === lang) {
        b.classList.add('is-active');
      } else {
        b.classList.remove('is-active');
      }
    });
  }

  if (window.MMI18N && typeof window.MMI18N.init === 'function') {
    window.MMI18N.init();
  }

  var langModal = document.getElementById('language-modal');

  if (langModal) {
    var urlParams = new URLSearchParams(window.location.search);
    var langFromUrl = urlParams.get('lang');
    var langSaved = null;

    try {
      langSaved = localStorage.getItem('user_lang_pref') || localStorage.getItem('lang') || localStorage.getItem('mm_lang');
    } catch (e) {}

    if (langFromUrl && supportedLangs.indexOf(langFromUrl.toLowerCase()) !== -1) {
      applyLanguage(langFromUrl);
    } else if (langSaved && supportedLangs.indexOf(langSaved.toLowerCase()) !== -1) {
      applyLanguage(langSaved);
    } else {
      langModal.classList.add('active');
    }

    var modalBtns = langModal.querySelectorAll('[data-lang-btn]');
    modalBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var chosen = btn.getAttribute('data-lang-btn');
        applyLanguage(chosen);

        var menuBtn = document.querySelector('.lang__menu [data-lang-btn="' + chosen + '"]');
        if (menuBtn) menuBtn.click();

        langModal.classList.remove('active');
      });
    });
  }

  var langPicker = document.getElementById('langPicker');
  var langToggle = document.getElementById('langToggle');
  if (langPicker && langToggle) {
    langToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = langPicker.classList.toggle('is-open');
      langToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    document.querySelectorAll('.lang__menu [data-lang-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var l = btn.getAttribute('data-lang-btn');
        applyLanguage(l);
        langPicker.classList.remove('is-open');
        langToggle.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!langPicker.contains(e.target)) {
        langPicker.classList.remove('is-open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        langPicker.classList.remove('is-open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var nav = document.getElementById('nav');
  var burger = document.getElementById('navBurger');
  var links = document.getElementById('navLinks');

  var hero = document.querySelector('.hero');
  function onScroll() {
    var trigger = hero ? hero.offsetHeight - 90 : 120;
    nav.classList.toggle('is-solid', window.scrollY > trigger);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  if (burger && links) {
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  var sections = ['parcours', 'expertise', 'marques', 'logiciels', 'produits', 'projets', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navMap = {};
  if (links) {
    links.querySelectorAll('a').forEach(function (a) {
      var href = a.getAttribute('href') || '';
      var id = href.replace('#', '');
      navMap[id] = a;
    });
  }

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          Object.values(navMap).forEach(function (a) { a.classList.remove('active'); });
          var active = navMap[e.target.id];
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    sections.forEach(function (s) { spy.observe(s); });
  }

  var revealTargets = document.querySelectorAll(
    '.parcours__body, .parcours__aside, .expertise__head, .pillar, .ai-card, ' +
    '.divider__inner, .case, .soft, .prod, .contact__inner'
  );
  revealTargets.forEach(function (el) { el.classList.add('reveal'); });

  if ('IntersectionObserver' in window) {
    var revealObs = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealTargets.forEach(function (el) { revealObs.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  }

  var frames = Array.prototype.slice.call(document.querySelectorAll('.live__ifr'));

  function scaleFrame(ifr) {
    var frame = ifr.parentElement;
    if (!frame) return;
    var s = frame.clientWidth / 1280;
    ifr.style.transform = 'scale(' + s + ')';
  }

  function loadFrame(ifr) {
    if (ifr.dataset.loaded) return;
    ifr.dataset.loaded = '1';
    var src = (ifr.getAttribute('data-src') || '').replace(/^http:/, 'https:');
    scaleFrame(ifr);
    ifr.addEventListener('load', function () { ifr.classList.add('is-ready'); });
    ifr.src = src;
  }

  if (frames.length) {
    frames.forEach(scaleFrame);
    var st;
    window.addEventListener('resize', function () {
      clearTimeout(st);
      st = setTimeout(function () { frames.forEach(scaleFrame); }, 150);
    });

    if (window.matchMedia('(min-width: 720px)').matches && 'IntersectionObserver' in window) {
      var frameObs = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { loadFrame(e.target); obs.unobserve(e.target); }
        });
      }, { rootMargin: '400px 0px' });
      frames.forEach(function (f) { frameObs.observe(f); });
    }
  }

  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbClose = lb ? lb.querySelector('.lightbox__close') : null;

  function openLb(src, alt) {
    if (!lb || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLb() {
    if (!lb || !lbImg) return;
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  document.querySelectorAll(
    '.case__gallery img, .soft__shots img, .prod__shots img, .case__cover img'
  ).forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () { openLb(img.src, img.alt); });
  });

  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) {
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lb && lb.classList.contains('is-open')) closeLb();
  });

})();

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("language-modal");
  const langModalBtns = modal.querySelectorAll("[data-lang-btn]");

  const urlParams = new URLSearchParams(window.location.search);
  const langUrl = urlParams.get("lang");
  const langSaved = localStorage.getItem("user_lang_pref");

  if (langUrl) {
    if (typeof setLanguage === "function") setLanguage(langUrl);
  } else if (langSaved) {
    if (typeof setLanguage === "function") setLanguage(langSaved);
  } else {

    modal.classList.add("active");
  }

  langModalBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const selectedLang = btn.getAttribute("data-lang-btn");

      localStorage.setItem("user_lang_pref", selectedLang);

      if (typeof setLanguage === "function") {
        setLanguage(selectedLang);
      } else if (typeof changeLanguage === "function") {
        changeLanguage(selectedLang);
      }

      const currentLabel = document.getElementById("langCurrent");
      if (currentLabel) {
        currentLabel.textContent = selectedLang.toUpperCase();
      }

      modal.classList.remove("active");
    });
  });
});
