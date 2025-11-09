// oneMemory - Memory Graph Visualization and Analytics
// This file handles the memory network graph visualization with ~150 nodes

// Memory data structure
let memoryData = {
    MEMORIES: [],
    LLM_FACTS: [],
    AGENTS: {},
    TOOLS: {},
    EVENTS: [],
    POI_RESULTS: [],
    HOTEL_RESULTS: [],
    PLAN_DRAFT: {},
    BOOKING_RESULT: {}
};

// Graph visualization variables
let memoryGraph = null;
let memorySimulation = null;
let selectedMemoryNode = null;
let memoryPopup = null;
let memoryCharts = {}; // Store chart instances for cleanup

// Initialize memory data with ~150 nodes
function initializeMemoryData() {
    const topics = [
        'travel:hawaii-2025', 'travel:switzerland-2025', 'travel:japan-2025',
        'work:project-alpha', 'work:project-beta', 'work:meeting-notes',
        'personal:health', 'personal:fitness', 'personal:finance',
        'shopping:electronics', 'shopping:clothing', 'shopping:groceries',
        'entertainment:movies', 'entertainment:music', 'entertainment:books',
        'food:restaurants', 'food:recipes', 'food:preferences',
        'tech:gadgets', 'tech:software', 'tech:hardware',
        'social:friends', 'social:family', 'social:events',
        'education:courses', 'education:skills', 'education:certifications',
        'finance:investments', 'finance:budget', 'finance:expenses',
        'health:medications', 'health:appointments', 'health:goals',
        'home:maintenance', 'home:improvements', 'home:utilities',
        'transport:commute', 'transport:travel', 'transport:vehicles',
        'hobbies:photography', 'hobbies:gaming', 'hobbies:reading',
        'business:clients', 'business:partners', 'business:deals',
        'weather:forecasts', 'weather:alerts', 'weather:history',
        'calendar:meetings', 'calendar:events', 'calendar:reminders',
        'communication:emails', 'communication:messages', 'communication:calls',
        'notes:ideas', 'notes:todo', 'notes:reminders',
        'files:documents', 'files:media', 'files:backups',
        'security:passwords', 'security:devices', 'security:alerts',
        'preferences:ui', 'preferences:notifications', 'preferences:privacy'
    ];

    // Generate ~150 memory nodes
    memoryData.MEMORIES = [];
    memoryData.LLM_FACTS = [];
    memoryData.POI_RESULTS = [];
    memoryData.HOTEL_RESULTS = [];

    const memoryKinds = ['preference', 'fact', 'event', 'goal', 'reminder', 'note'];
    const tags = ['travel', 'work', 'personal', 'shopping', 'entertainment', 'food', 'tech', 'social', 'education', 'finance', 'health', 'home', 'transport', 'hobbies', 'business', 'weather', 'calendar', 'communication', 'notes', 'files', 'security', 'preferences'];

    // Generate memories
    for (let i = 0; i < 150; i++) {
        const topic = topics[Math.floor(Math.random() * topics.length)];
        const kind = memoryKinds[Math.floor(Math.random() * memoryKinds.length)];
        const nodeTags = [tags[Math.floor(Math.random() * tags.length)]];
        if (Math.random() > 0.5) {
            nodeTags.push(tags[Math.floor(Math.random() * tags.length)]);
        }

        let body = '';
        switch (kind) {
            case 'preference':
                body = `Prefers ${['morning', 'afternoon', 'evening'][Math.floor(Math.random() * 3)]} ${['flights', 'meetings', 'calls', 'workouts'][Math.floor(Math.random() * 4)]}; ${['Marriott', 'Hilton', 'Hyatt', 'Airbnb'][Math.floor(Math.random() * 4)]} member`;
                break;
            case 'fact':
                body = `Budget ~ $${Math.floor(Math.random() * 5000) + 500} for ${['hotels', 'flights', 'meals', 'activities'][Math.floor(Math.random() * 4)]}`;
                break;
            case 'event':
                body = `${['Meeting', 'Trip', 'Appointment', 'Event'][Math.floor(Math.random() * 4)]} scheduled for ${new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}`;
                break;
            case 'goal':
                body = `Goal: ${['Complete', 'Achieve', 'Learn', 'Improve'][Math.floor(Math.random() * 4)]} ${['project', 'skill', 'fitness', 'finance'][Math.floor(Math.random() * 4)]} by ${new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}`;
                break;
            case 'reminder':
                body = `Reminder: ${['Call', 'Email', 'Meet', 'Review'][Math.floor(Math.random() * 4)]} ${['client', 'team', 'doctor', 'friend'][Math.floor(Math.random() * 4)]} about ${['project', 'appointment', 'meeting', 'update'][Math.floor(Math.random() * 4)]}`;
                break;
            case 'note':
                body = `Note: ${['Important', 'Interesting', 'Useful', 'Critical'][Math.floor(Math.random() * 4)]} information about ${['project', 'trip', 'meeting', 'task'][Math.floor(Math.random() * 4)]}`;
                break;
        }

        // Generate random date/time within last 90 days
        const date = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
        const dateStr = date.toISOString().split('T')[0];
        const timeStr = date.toTimeString().split(' ')[0].substring(0, 5);
        
        // Generate random device/agent
        const devices = ['iPhone 14', 'MacBook Pro', 'iPad Air', 'Windows PC', 'Android Phone', 'Chrome Browser', 'Safari Browser', 'One Agent', 'One Voice', 'One Data'];
        const agents = ['One Agent', 'Calendar Agent', 'Email Agent', 'Voice Agent', 'Data Agent', 'System Agent'];
        const deviceOrAgent = Math.random() > 0.5 ? devices[Math.floor(Math.random() * devices.length)] : agents[Math.floor(Math.random() * agents.length)];
        
        memoryData.MEMORIES.push({
            id: `m${i + 1}`,
            topic_key: topic,
            kind: kind,
            body: body,
            tags: nodeTags,
            date: dateStr,
            time: timeStr,
            device: deviceOrAgent,
            timestamp: date.getTime()
        });

        // Generate LLM facts for some topics
        if (i % 5 === 0) {
            memoryData.LLM_FACTS.push({
                topic_key: topic,
                llm: ['chatgpt', 'claude', 'gemini'][Math.floor(Math.random() * 3)],
                answer: `Top ${['sights', 'recommendations', 'tips', 'insights'][Math.floor(Math.random() * 4)]}: ${['Beach', 'Mountain', 'City', 'Restaurant'][Math.floor(Math.random() * 4)]}, ${['Park', 'Museum', 'Hotel', 'Cafe'][Math.floor(Math.random() * 4)]}, ${['Viewpoint', 'Market', 'Theater', 'Garden'][Math.floor(Math.random() * 4)]}`
            });
        }

        // Generate POI results for travel topics
        if (topic.startsWith('travel:') && i % 3 === 0) {
            const pois = ['Beach', 'Mountain', 'City Center', 'Park', 'Museum', 'Restaurant', 'Hotel', 'Cafe', 'Market', 'Theater'];
            for (let j = 0; j < 3; j++) {
                memoryData.POI_RESULTS.push({
                    name: pois[Math.floor(Math.random() * pois.length)] + ` ${Math.floor(Math.random() * 100)}`
                });
            }
        }

        // Generate hotel results for travel topics
        if (topic.startsWith('travel:') && i % 4 === 0) {
            const hotels = ['Queen Kapiolani', 'Aqua Aloha Surf', 'Hilton Waikiki', 'Marriott Resort', 'Hyatt Regency', 'Sheraton', 'Westin', 'Four Seasons'];
            const areas = ['Waikiki', 'Downtown', 'Beachfront', 'City Center', 'Resort Area', 'Historic District'];
            for (let j = 0; j < 2; j++) {
                memoryData.HOTEL_RESULTS.push({
                    name: hotels[Math.floor(Math.random() * hotels.length)],
                    area: areas[Math.floor(Math.random() * areas.length)],
                    price: Math.floor(Math.random() * 300) + 100,
                    distance_km: (Math.random() * 5).toFixed(1)
                });
            }
        }
    }

    // Generate some plan drafts
    memoryData.PLAN_DRAFT = {
        summary: "3-night stay near center; AM flight; hotels under $200",
        steps: [
            { do: "Search hotels near POIs", status: "ready" },
            { do: "Propose itinerary blocks", status: "ready" },
            { do: "On accept: pay + add calendar", status: "ready" }
        ],
        calendar_blocks: [
            { title: "Fly BOS→HNL", start: "2025-06-12T07:00:00", end: "2025-06-12T13:30:00" },
            { title: "Return HNL→BOS", start: "2025-06-15T10:00:00", end: "2025-06-15T17:30:00" }
        ],
        cost: { hotel_estimate: 540, flight_estimate: 780 }
    };

    // Generate booking result
    memoryData.BOOKING_RESULT = {
        banking: { txn_id: "txn_12345", amount: 540.00, status: "success" },
        calendar: { created: 3 },
        notifier: { spoken: "Trip booked! See calendar for details." }
    };
}

// Create graph nodes from memory data
function createMemoryNodes() {
    const nodes = [];
    const nodeMap = new Map();

    // Create nodes from memories
    memoryData.MEMORIES.forEach((memory, index) => {
        const nodeId = memory.id;
        if (!nodeMap.has(nodeId)) {
            nodes.push({
                id: nodeId,
                type: 'memory',
                kind: memory.kind,
                topic_key: memory.topic_key,
                data: memory,
                x: Math.random() * 2000 - 1000,
                y: Math.random() * 2000 - 1000,
                cluster: memory.kind,
                size: 8 + Math.random() * 12
            });
            nodeMap.set(nodeId, nodes.length - 1);
        }
    });

    // Create nodes from LLM facts
    memoryData.LLM_FACTS.forEach((fact, index) => {
        const nodeId = `llm_${index}`;
        nodes.push({
            id: nodeId,
            type: 'llm_fact',
            topic_key: fact.topic_key,
            data: fact,
            x: Math.random() * 2000 - 1000,
            y: Math.random() * 2000 - 1000,
            cluster: 'llm',
            size: 6 + Math.random() * 8
        });
    });

    // Create nodes from POI results
    memoryData.POI_RESULTS.forEach((poi, index) => {
        const nodeId = `poi_${index}`;
        nodes.push({
            id: nodeId,
            type: 'poi',
            data: poi,
            x: Math.random() * 2000 - 1000,
            y: Math.random() * 2000 - 1000,
            cluster: 'poi',
            size: 5 + Math.random() * 7
        });
    });

    // Create nodes from hotel results
    memoryData.HOTEL_RESULTS.forEach((hotel, index) => {
        const nodeId = `hotel_${index}`;
        nodes.push({
            id: nodeId,
            type: 'hotel',
            data: hotel,
            x: Math.random() * 2000 - 1000,
            y: Math.random() * 2000 - 1000,
            cluster: 'hotel',
            size: 6 + Math.random() * 8
        });
    });

    return nodes;
}

// Create edges between nodes
function createMemoryEdges(nodes) {
    const edges = [];
    const topicMap = new Map();

    // Group nodes by topic_key
    nodes.forEach(node => {
        if (node.topic_key) {
            if (!topicMap.has(node.topic_key)) {
                topicMap.set(node.topic_key, []);
            }
            topicMap.get(node.topic_key).push(node);
        }
    });

    // Create edges within same topic
    topicMap.forEach((topicNodes, topic) => {
        for (let i = 0; i < topicNodes.length; i++) {
            for (let j = i + 1; j < topicNodes.length; j++) {
                if (Math.random() > 0.7) {
                    edges.push({
                        source: topicNodes[i].id,
                        target: topicNodes[j].id,
                        type: 'topic',
                        strength: 0.3
                    });
                }
            }
        }
    });

    // Create edges between similar clusters
    const clusterMap = new Map();
    nodes.forEach(node => {
        if (!clusterMap.has(node.cluster)) {
            clusterMap.set(node.cluster, []);
        }
        clusterMap.get(node.cluster).push(node);
    });

    clusterMap.forEach((clusterNodes, cluster) => {
        for (let i = 0; i < clusterNodes.length; i++) {
            for (let j = i + 1; j < clusterNodes.length; j++) {
                if (Math.random() > 0.8) {
                    edges.push({
                        source: clusterNodes[i].id,
                        target: clusterNodes[j].id,
                        type: 'cluster',
                        strength: 0.2
                    });
                }
            }
        }
    });

    // Create random connections
    for (let i = 0; i < nodes.length * 0.1; i++) {
        const source = nodes[Math.floor(Math.random() * nodes.length)];
        const target = nodes[Math.floor(Math.random() * nodes.length)];
        if (source.id !== target.id) {
            edges.push({
                source: source.id,
                target: target.id,
                type: 'random',
                strength: 0.1
            });
        }
    }

    return edges;
}

// Render memory graph
function renderMemoryGraph() {
    console.log('🔄 renderMemoryGraph: Starting...');
    
    const container = d3.select('#memoryGraphContainer');
    
    // Check if container exists
    if (container.empty()) {
        console.error('❌ renderMemoryGraph: Container not found');
        return;
    }
    
    const containerNode = container.node();
    if (!containerNode) {
        console.error('❌ renderMemoryGraph: Container node not found');
        return;
    }
    
    console.log('✅ renderMemoryGraph: Container found');
    container.selectAll('*').remove();

    // Get dimensions - try multiple methods
    let width = containerNode.offsetWidth || containerNode.clientWidth || 1200;
    let height = containerNode.offsetHeight || containerNode.clientHeight || 800;
    
    // If still zero, use parent dimensions or defaults
    if (width === 0 || height === 0) {
        const parent = containerNode.parentElement;
        if (parent) {
            width = parent.offsetWidth || parent.clientWidth || 1200;
            height = parent.offsetHeight || parent.clientHeight || 800;
        }
        if (width === 0 || height === 0) {
            console.warn('Memory graph container has zero dimensions, using defaults');
            width = 1200;
            height = 800;
        }
    }
    
    console.log('✅ renderMemoryGraph: Container dimensions:', width, 'x', height);

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'block')
        .style('background', 'rgba(0, 0, 0, 0.1)');

    const g = svg.append('g');
    
    console.log('✅ renderMemoryGraph: SVG created with dimensions:', width, 'x', height);

    // Create nodes and edges
    console.log('🔄 renderMemoryGraph: Creating nodes and edges...');
    console.log('   - memoryData.MEMORIES.length:', memoryData.MEMORIES.length);
    console.log('   - memoryData.LLM_FACTS.length:', memoryData.LLM_FACTS.length);
    console.log('   - memoryData.POI_RESULTS.length:', memoryData.POI_RESULTS.length);
    console.log('   - memoryData.HOTEL_RESULTS.length:', memoryData.HOTEL_RESULTS.length);
    
    // Make sure memory data is initialized
    if (memoryData.MEMORIES.length === 0) {
        console.warn('⚠️ renderMemoryGraph: Memory data is empty, initializing now...');
        initializeMemoryData();
        console.log('✅ renderMemoryGraph: Memory data initialized -', memoryData.MEMORIES.length, 'memories');
    }
    
    const nodes = createMemoryNodes();
    const edges = createMemoryEdges(nodes);
    
    console.log('✅ renderMemoryGraph: Created', nodes.length, 'nodes and', edges.length, 'edges');
    
    if (nodes.length === 0) {
        console.error('❌ renderMemoryGraph: No nodes created!');
        console.error('   - memoryData.MEMORIES:', memoryData.MEMORIES);
        return;
    }

    // Initialize node positions to be visible
    nodes.forEach(node => {
        if (!node.x || !node.y || isNaN(node.x) || isNaN(node.y)) {
            node.x = width / 2 + (Math.random() - 0.5) * width * 0.8;
            node.y = height / 2 + (Math.random() - 0.5) * height * 0.8;
        }
    });
    
    // Store nodes and edges in memoryGraph before creating force
    memoryGraph = { svg, g, nodes, edges, node: null, link: null };
    
    // Create force simulation
    memorySimulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(edges).id(d => d.id).distance(80).strength(0.6))
        .force('charge', d3.forceManyBody().strength(-400))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => Math.max(d.size, 6) + 8))
        .force('cluster', forceCluster())
        .alpha(1)
        .alphaDecay(0.02);

    // Color scale for clusters
    const clusterColors = {
        'preference': '#6366f1',
        'fact': '#8b5cf6',
        'event': '#ec4899',
        'goal': '#f59e0b',
        'reminder': '#10b981',
        'note': '#3b82f6',
        'llm': '#ef4444',
        'poi': '#14b8a6',
        'hotel': '#f97316'
    };

    // Draw edges
    const link = g.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(edges)
        .enter().append('line')
        .attr('stroke', d => {
            if (d.type === 'topic') return 'rgba(99, 102, 241, 0.5)';
            if (d.type === 'cluster') return 'rgba(139, 92, 246, 0.4)';
            return 'rgba(255, 255, 255, 0.2)';
        })
        .attr('stroke-width', d => Math.max(d.strength * 3, 1))
        .style('opacity', 0.6);

    // Draw nodes
    const node = g.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', d => Math.max(d.size, 6)) // Ensure minimum size of 6
        .attr('fill', d => clusterColors[d.cluster] || '#6366f1')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .style('opacity', 0.9)
        .style('filter', 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.3))')
        .call(drag(memorySimulation))
        .on('mouseover', function(event, d) {
            d3.select(this)
                .attr('r', d => Math.max(d.size * 1.5, 10))
                .style('opacity', 1)
                .style('stroke-width', 3);
            showMemoryTooltip(event, d);
        })
        .on('mouseout', function(event, d) {
            d3.select(this)
                .attr('r', d => Math.max(d.size, 6))
                .style('opacity', 0.9)
                .style('stroke-width', 2);
            hideMemoryTooltip();
        })
        .on('dblclick', function(event, d) {
            openMemoryPopup(d);
        });

    // Update positions on tick
    memorySimulation.on('tick', () => {
        if (!link || !node) return;
        
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });
    
    // Start the simulation
    memorySimulation.alpha(1).restart();
    console.log('✅ renderMemoryGraph: Force simulation started with', nodes.length, 'nodes and', edges.length, 'edges');
    
    // Add legend
    addGraphLegend(svg, clusterColors, width, height);

    // Zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
        });

    svg.call(zoom);

    // Update memoryGraph with node and link references
    memoryGraph.node = node;
    memoryGraph.link = link;
    
    console.log('✅ renderMemoryGraph: Graph rendering complete!');
    console.log('   - Nodes rendered:', node.size());
    console.log('   - Links rendered:', link.size());
    console.log('   - SVG dimensions:', width, 'x', height);
    console.log('=== renderMemoryGraph: Finished ===');
}

// Add legend to graph (fixed position, not affected by zoom)
function addGraphLegend(svg, clusterColors, width, height) {
    // Create a separate group for legend that won't be affected by zoom
    const legendGroup = svg.append('g')
        .attr('class', 'legend-group')
        .attr('transform', `translate(${width - 200}, 20)`);
    
    const legendData = [
        { color: clusterColors['preference'], label: 'Preference' },
        { color: clusterColors['fact'], label: 'Fact' },
        { color: clusterColors['event'], label: 'Event' },
        { color: clusterColors['goal'], label: 'Goal' },
        { color: clusterColors['reminder'], label: 'Reminder' },
        { color: clusterColors['note'], label: 'Note' },
        { color: clusterColors['llm'], label: 'LLM Fact' },
        { color: clusterColors['poi'], label: 'POI' },
        { color: clusterColors['hotel'], label: 'Hotel' }
    ];
    
    const legendBg = legendGroup.append('rect')
        .attr('x', -10)
        .attr('y', -10)
        .attr('width', 190)
        .attr('height', legendData.length * 25 + 20)
        .attr('fill', 'rgba(0, 0, 0, 0.85)')
        .attr('stroke', 'rgba(255, 255, 255, 0.3)')
        .attr('stroke-width', 1.5)
        .attr('rx', 8)
        .style('backdrop-filter', 'blur(10px)');
    
    const legendTitle = legendGroup.append('text')
        .attr('x', 0)
        .attr('y', 5)
        .attr('fill', '#fff')
        .attr('font-size', '13px')
        .attr('font-weight', 'bold')
        .text('Node Types');
    
    legendData.forEach((item, i) => {
        const itemGroup = legendGroup.append('g')
            .attr('transform', `translate(0, ${i * 25 + 20})`);
        
        itemGroup.append('circle')
            .attr('r', 7)
            .attr('cx', 8)
            .attr('cy', 0)
            .attr('fill', item.color)
            .attr('stroke', '#fff')
            .attr('stroke-width', 2)
            .style('filter', 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.3))');
        
        itemGroup.append('text')
            .attr('x', 22)
            .attr('y', 4)
            .attr('fill', '#fff')
            .attr('font-size', '11px')
            .attr('font-family', 'system-ui, -apple-system, sans-serif')
            .text(item.label);
    });
    
    // Legend is already outside the zoomed group (g), so it stays fixed
    // No need to handle zoom events for the legend
}

// Force for clustering
function forceCluster() {
    const strength = 0.1;
    const clusters = {};

    return function(alpha) {
        memoryGraph.nodes.forEach(d => {
            if (!clusters[d.cluster]) {
                clusters[d.cluster] = { x: 0, y: 0, count: 0 };
            }
            clusters[d.cluster].x += d.x;
            clusters[d.cluster].y += d.y;
            clusters[d.cluster].count++;
        });

        Object.keys(clusters).forEach(key => {
            clusters[key].x /= clusters[key].count;
            clusters[key].y /= clusters[key].count;
        });

        memoryGraph.nodes.forEach(d => {
            const cluster = clusters[d.cluster];
            const dx = cluster.x - d.x;
            const dy = cluster.y - d.y;
            d.vx += dx * strength * alpha;
            d.vy += dy * strength * alpha;
        });
    };
}

// Drag behavior
function drag(simulation) {
    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
}

// Show memory tooltip on hover
function showMemoryTooltip(event, node) {
    const tooltip = d3.select('#memoryTooltip');
    
    // Get complete memory data for this node in the specified format
    let memoryJson = formatCompleteMemoryJson(node);

    tooltip
        .style('display', 'block')
        .style('left', (event.pageX + 10) + 'px')
        .style('top', (event.pageY + 10) + 'px')
        .html(`<pre style="margin: 0; font-size: 11px; line-height: 1.6; color: #fff; font-family: 'Courier New', monospace;">${memoryJson}</pre>`);
}

// Hide memory tooltip
function hideMemoryTooltip() {
    d3.select('#memoryTooltip').style('display', 'none');
}

// Format complete memory JSON in the specified format
function formatCompleteMemoryJson(node) {
    let json = '';
    
    // Get topic_key from node
    const topicKey = node.topic_key || (node.data && node.data.topic_key) || '';
    
    // Get all memories for this topic
    const topicMemories = memoryData.MEMORIES.filter(m => {
        if (node.type === 'memory') {
            return m.topic_key === (node.data?.topic_key || node.topic_key);
        } else if (topicKey) {
            return m.topic_key === topicKey;
        }
        return false;
    });
    
    // Get LLM facts for this topic
    const topicLLMFacts = memoryData.LLM_FACTS.filter(f => {
        if (node.type === 'llm_fact') {
            return f.topic_key === (node.data?.topic_key || node.topic_key);
        } else if (topicKey) {
            return f.topic_key === topicKey;
        }
        return false;
    });
    
    // Get POI results for this topic
    const topicPOIs = memoryData.POI_RESULTS.filter(p => {
        if (node.type === 'poi') {
            return true; // Show all POIs for POI nodes
        }
        return topicMemories.some(m => m.tags && m.tags.includes('travel'));
    });
    
    // Get hotel results for this topic
    const topicHotels = memoryData.HOTEL_RESULTS.filter(h => {
        if (node.type === 'hotel') {
            return true; // Show all hotels for hotel nodes
        }
        return topicMemories.some(m => m.tags && m.tags.includes('travel'));
    });
    
    // Format MEMORIES
    json += 'MEMORIES = [\n';
    if (topicMemories.length > 0) {
        topicMemories.forEach((mem, i) => {
            json += `  ${JSON.stringify({
                id: mem.id,
                topic_key: mem.topic_key,
                kind: mem.kind,
                body: mem.body,
                tags: mem.tags
            })}`;
            if (i < topicMemories.length - 1) json += ',';
            json += '\n';
        });
    }
    json += ']\n\n';
    
    // Format LLM_FACTS
    json += 'LLM_FACTS = [';
    if (topicLLMFacts.length > 0) {
        json += '\n';
        topicLLMFacts.forEach((fact, i) => {
            json += `  ${JSON.stringify({
                topic_key: fact.topic_key,
                llm: fact.llm,
                answer: fact.answer
            })}`;
            if (i < topicLLMFacts.length - 1) json += ',';
            json += '\n';
        });
    }
    json += ']\n\n';
    
    // Format AGENTS
    json += 'AGENTS = {}\n\n';
    
    // Format TOOLS
    json += 'TOOLS = {}\n\n';
    
    // Format EVENTS
    json += 'EVENTS = []\n\n';
    
    // Format POI_RESULTS
    json += 'POI_RESULTS = [\n';
    if (topicPOIs.length > 0) {
        topicPOIs.forEach((poi, i) => {
            json += `  ${JSON.stringify({ name: poi.name })}`;
            if (i < topicPOIs.length - 1) json += ',';
            json += '\n';
        });
    }
    json += ']\n\n';
    
    // Format HOTEL_RESULTS
    json += 'HOTEL_RESULTS = [\n';
    if (topicHotels.length > 0) {
        topicHotels.forEach((hotel, i) => {
            json += `  ${JSON.stringify({
                name: hotel.name,
                area: hotel.area,
                price: hotel.price,
                distance_km: parseFloat(hotel.distance_km)
            })}`;
            if (i < topicHotels.length - 1) json += ',';
            json += '\n';
        });
    }
    json += ']\n\n';
    
    // Format PLAN_DRAFT
    json += 'PLAN_DRAFT = ' + JSON.stringify(memoryData.PLAN_DRAFT, null, 2).replace(/\n/g, '\n') + '\n\n';
    
    // Format BOOKING_RESULT
    json += 'BOOKING_RESULT = ' + JSON.stringify(memoryData.BOOKING_RESULT, null, 2).replace(/\n/g, '\n');
    
    return json;
}

// Open memory popup on double-click
function openMemoryPopup(node) {
    // Create popup if it doesn't exist
    if (!memoryPopup) {
        memoryPopup = document.createElement('div');
        memoryPopup.id = 'memoryPopup';
        memoryPopup.className = 'memory-popup';
        document.body.appendChild(memoryPopup);
    }

    // Get topic_key from node
    const topicKey = node.topic_key || (node.data && node.data.topic_key) || '';
    
    // Get all memories for this topic
    const topicMemories = memoryData.MEMORIES.filter(m => {
        if (node.type === 'memory') {
            return m.topic_key === (node.data?.topic_key || node.topic_key);
        } else if (topicKey) {
            return m.topic_key === topicKey;
        }
        return false;
    });
    const topicLLMFacts = memoryData.LLM_FACTS.filter(f => {
        if (node.type === 'llm_fact') {
            return f.topic_key === (node.data?.topic_key || node.topic_key);
        } else if (topicKey) {
            return f.topic_key === topicKey;
        }
        return false;
    });
    const topicPOIs = memoryData.POI_RESULTS.filter(p => {
        if (node.type === 'poi') {
            return true; // Show all POIs for POI nodes
        }
        return topicMemories.some(m => m.tags && m.tags.includes('travel'));
    });
    const topicHotels = memoryData.HOTEL_RESULTS.filter(h => {
        if (node.type === 'hotel') {
            return true; // Show all hotels for hotel nodes
        }
        return topicMemories.some(m => m.tags && m.tags.includes('travel'));
    });

    // Format full JSON
    const fullJson = {
        MEMORIES: topicMemories,
        LLM_FACTS: topicLLMFacts,
        AGENTS: memoryData.AGENTS,
        TOOLS: memoryData.TOOLS,
        EVENTS: memoryData.EVENTS,
        POI_RESULTS: topicPOIs,
        HOTEL_RESULTS: topicHotels,
        PLAN_DRAFT: memoryData.PLAN_DRAFT,
        BOOKING_RESULT: memoryData.BOOKING_RESULT
    };

    // Create popup content
    memoryPopup.innerHTML = `
        <div class="memory-popup-header">
            <h3>Memory Details: ${node.topic_key || node.id}</h3>
            <button onclick="closeMemoryPopup()" class="memory-popup-close">×</button>
        </div>
        <div class="memory-popup-content">
            <div class="memory-popup-tabs">
                <button class="memory-popup-tab active" onclick="switchMemoryPopupTab('graph')">Graph</button>
                <button class="memory-popup-tab" onclick="switchMemoryPopupTab('json')">JSON</button>
                <button class="memory-popup-tab" onclick="switchMemoryPopupTab('analytics')">Analytics</button>
            </div>
            <div class="memory-popup-tab-content" id="memoryPopupGraph">
                <div id="memoryPopupGraphContainer" style="width: 100%; height: 400px;"></div>
            </div>
            <div class="memory-popup-tab-content" id="memoryPopupJson" style="display: none;">
                <pre style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; overflow: auto; max-height: 500px; font-size: 12px; line-height: 1.5; font-family: 'Courier New', monospace; color: #fff;">${formatCompleteMemoryJson(node)}</pre>
            </div>
            <div class="memory-popup-tab-content" id="memoryPopupAnalytics" style="display: none;">
                <div id="memoryPopupAnalyticsContainer"></div>
            </div>
        </div>
    `;

    memoryPopup.style.display = 'block';

    // Render sub-graph
    setTimeout(() => {
        renderMemorySubGraph(node, topicMemories);
    }, 100);

    // Render analytics
    setTimeout(() => {
        renderMemoryPopupAnalytics(node, topicMemories);
    }, 200);
}

// Render sub-graph for popup
function renderMemorySubGraph(node, memories) {
    const container = d3.select('#memoryPopupGraphContainer');
    container.selectAll('*').remove();
    
    // Remove any existing tooltip
    d3.selectAll('.subgraph-tooltip').remove();

    const width = container.node().offsetWidth || 800;
    const height = 400;

    const svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('display', 'block')
        .style('background', 'rgba(0, 0, 0, 0.1)');

    const g = svg.append('g');

    // Create single node for this topic (center node)
    const subNodes = [{
        id: node.id,
        type: node.type,
        data: node.data || node,
        topic_key: node.topic_key || node.data?.topic_key,
        x: width / 2,
        y: height / 2,
        size: 40,
        cluster: node.cluster || 'memory'
    }];

    // Add related memory nodes in a circle around center
    const maxRelated = Math.min(memories.length, 15);
    const relatedMemories = memories.slice(0, maxRelated);
    
    relatedMemories.forEach((mem, i) => {
        const angle = (i / maxRelated) * Math.PI * 2;
        const radius = Math.min(width, height) * 0.3;
        const memId = mem.id || `mem_${i}`;
        subNodes.push({
            id: memId,
            type: 'memory',
            data: mem,
            topic_key: mem.topic_key,
            x: width / 2 + Math.cos(angle) * radius,
            y: height / 2 + Math.sin(angle) * radius,
            size: 20,
            cluster: mem.kind || 'memory'
        });
    });
    
    // Create edges to related memories
    const subEdges = relatedMemories.map((mem, i) => ({
        source: node.id,
        target: mem.id || `mem_${i}`,
        type: 'related',
        strength: 0.5
    }));

    // Color scale for clusters
    const clusterColors = {
        'preference': '#6366f1',
        'fact': '#8b5cf6',
        'event': '#ec4899',
        'goal': '#f59e0b',
        'reminder': '#10b981',
        'note': '#3b82f6',
        'llm': '#ef4444',
        'poi': '#14b8a6',
        'hotel': '#f97316',
        'memory': '#6366f1'
    };

    // Create force simulation
    const simulation = d3.forceSimulation(subNodes)
        .force('link', d3.forceLink(subEdges).id(d => d.id).distance(120).strength(0.7))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(d => d.size + 10))
        .alpha(1)
        .alphaDecay(0.02);

    // Draw edges
    const link = g.append('g')
        .selectAll('line')
        .data(subEdges)
        .enter().append('line')
        .attr('stroke', 'rgba(99, 102, 241, 0.6)')
        .attr('stroke-width', 2)
        .style('opacity', 0.7);

    // Create tooltip for subgraph (check if it exists first)
    let subgraphTooltip = d3.select('.subgraph-tooltip');
    if (subgraphTooltip.empty()) {
        subgraphTooltip = d3.select('body').append('div')
            .attr('class', 'subgraph-tooltip');
    }
    
    subgraphTooltip
        .style('position', 'fixed') // Use fixed instead of absolute
        .style('background', 'rgba(0, 0, 0, 0.95)')
        .style('border', '1px solid rgba(99, 102, 241, 0.5)')
        .style('border-radius', '8px')
        .style('padding', '12px 15px')
        .style('max-width', '300px')
        .style('z-index', '99999') // Very high z-index
        .style('display', 'none')
        .style('box-shadow', '0 4px 20px rgba(0, 0, 0, 0.5)')
        .style('pointer-events', 'none')
        .style('font-family', 'system-ui, -apple-system, sans-serif')
        .style('font-size', '12px')
        .style('color', '#fff')
        .style('line-height', '1.6');
    
    // Function to get tooltip content for a node
    function getSubgraphTooltipContent(node) {
        const data = node.data || {};
        const date = data.date || 'N/A';
        const time = data.time || 'N/A';
        const device = data.device || 'Unknown Device';
        const body = data.body || node.data?.body || 'No description available';
        
        // Format date nicely
        let formattedDate = date;
        if (date !== 'N/A' && date !== undefined) {
            try {
                const dateObj = new Date(date);
                if (!isNaN(dateObj.getTime())) {
                    formattedDate = dateObj.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                    });
                }
            } catch (e) {
                formattedDate = date;
            }
        }
        
        return `
            <div style="margin-bottom: 8px;">
                <div style="color: rgba(99, 102, 241, 1); font-weight: bold; margin-bottom: 6px; font-size: 13px;">${node.id || 'Unknown'}</div>
                <div style="margin-bottom: 4px;">
                    <span style="color: rgba(255, 255, 255, 0.7);">📅 Date:</span>
                    <span style="color: #fff; margin-left: 8px;">${formattedDate}</span>
                </div>
                <div style="margin-bottom: 4px;">
                    <span style="color: rgba(255, 255, 255, 0.7);">🕐 Time:</span>
                    <span style="color: #fff; margin-left: 8px;">${time}</span>
                </div>
                <div style="margin-bottom: 8px;">
                    <span style="color: rgba(255, 255, 255, 0.7);">📱 Device/Agent:</span>
                    <span style="color: #fff; margin-left: 8px;">${device}</span>
                </div>
                <div style="border-top: 1px solid rgba(255, 255, 255, 0.2); padding-top: 8px; margin-top: 8px;">
                    <div style="color: rgba(255, 255, 255, 0.7); margin-bottom: 4px;">Description:</div>
                    <div style="color: #fff; font-size: 11px; line-height: 1.5;">${body}</div>
                </div>
            </div>
        `;
    }
    
    // Draw nodes
    const nodeElements = g.append('g')
        .selectAll('circle')
        .data(subNodes)
        .enter().append('circle')
        .attr('r', d => d.size)
        .attr('fill', d => clusterColors[d.cluster] || '#6366f1')
        .attr('stroke', '#fff')
        .attr('stroke-width', 3)
        .style('opacity', 0.9)
        .style('cursor', 'pointer')
        .style('filter', 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.4))')
        .on('mouseover', function(event, d) {
            d3.select(this)
                .attr('r', d => d.size * 1.3)
                .style('opacity', 1)
                .style('stroke-width', 4);
            
            // Show tooltip
            const tooltipContent = getSubgraphTooltipContent(d);
            subgraphTooltip
                .html(tooltipContent)
                .style('display', 'block')
                .style('left', (event.pageX + 15) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mousemove', function(event, d) {
            // Update tooltip position as mouse moves
            subgraphTooltip
                .style('left', (event.pageX + 15) + 'px')
                .style('top', (event.pageY - 10) + 'px');
        })
        .on('mouseout', function(event, d) {
            d3.select(this)
                .attr('r', d => d.size)
                .style('opacity', 0.9)
                .style('stroke-width', 3);
            
            // Hide tooltip
            subgraphTooltip.style('display', 'none');
        });

    // Update positions
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        nodeElements
            .attr('cx', d => d.x)
            .attr('cy', d => d.y);
    });
    
    // Start simulation
    simulation.alpha(1).restart();
    
    console.log('✅ renderMemorySubGraph: Sub-graph rendered with', subNodes.length, 'nodes');
    console.log('   - Center node:', node.id);
    console.log('   - Related nodes:', subNodes.length - 1);
}

// Close memory popup
function closeMemoryPopup() {
    if (memoryPopup) {
        memoryPopup.style.display = 'none';
    }
}

// Switch memory popup tab
function switchMemoryPopupTab(tab) {
    // Hide all tabs
    document.querySelectorAll('.memory-popup-tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.querySelectorAll('.memory-popup-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(`memoryPopup${tab.charAt(0).toUpperCase() + tab.slice(1)}`).style.display = 'block';
    event.target.classList.add('active');
}

// Render analytics for popup
function renderMemoryPopupAnalytics(node, memories) {
    const container = document.getElementById('memoryPopupAnalyticsContainer');
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
            <div class="analytics-card">
                <h4>Memory Count</h4>
                <div style="font-size: 32px; font-weight: 700; color: #6366f1;">${memories.length}</div>
            </div>
            <div class="analytics-card">
                <h4>Memory Types</h4>
                <div id="popupMemoryTypesChart" style="height: 200px;"></div>
            </div>
            <div class="analytics-card">
                <h4>Tags Distribution</h4>
                <div id="popupTagsChart" style="height: 200px;"></div>
            </div>
            <div class="analytics-card">
                <h4>Timeline</h4>
                <div id="popupTimelineChart" style="height: 200px;"></div>
            </div>
        </div>
    `;

    // Create charts
    createPopupMemoryTypesChart(memories);
    createPopupTagsChart(memories);
    createPopupTimelineChart(memories);
}

// Create popup memory types chart
function createPopupMemoryTypesChart(memories) {
    const container = document.getElementById('popupMemoryTypesChart');
    if (!container) return;
    
    // Clear container and destroy existing chart
    const existingChart = memoryCharts['popupMemoryTypesChart'];
    if (existingChart) {
        try {
            existingChart.destroy();
        } catch (e) {
            console.warn('Error destroying popup chart:', e);
        }
        delete memoryCharts['popupMemoryTypesChart'];
    }
    container.innerHTML = '';
    
    const types = {};
    memories.forEach(m => {
        types[m.kind] = (types[m.kind] || 0) + 1;
    });

    const ctx = document.createElement('canvas');
    container.appendChild(ctx);
    memoryCharts['popupMemoryTypesChart'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(types),
            datasets: [{
                data: Object.values(types),
                backgroundColor: ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: true, position: 'bottom' }
            }
        }
    });
}

// Create popup tags chart
function createPopupTagsChart(memories) {
    const container = document.getElementById('popupTagsChart');
    if (!container) return;
    
    // Clear container and destroy existing chart
    const existingChart = memoryCharts['popupTagsChart'];
    if (existingChart) {
        try {
            existingChart.destroy();
        } catch (e) {
            console.warn('Error destroying popup chart:', e);
        }
        delete memoryCharts['popupTagsChart'];
    }
    container.innerHTML = '';
    
    const tags = {};
    memories.forEach(m => {
        m.tags.forEach(tag => {
            tags[tag] = (tags[tag] || 0) + 1;
        });
    });

    const ctx = document.createElement('canvas');
    container.appendChild(ctx);
    memoryCharts['popupTagsChart'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(tags),
            datasets: [{
                label: 'Count',
                data: Object.values(tags),
                backgroundColor: '#6366f1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Create popup timeline chart
function createPopupTimelineChart(memories) {
    const container = document.getElementById('popupTimelineChart');
    if (!container) return;
    
    // Clear container and destroy existing chart
    const existingChart = memoryCharts['popupTimelineChart'];
    if (existingChart) {
        try {
            existingChart.destroy();
        } catch (e) {
            console.warn('Error destroying popup chart:', e);
        }
        delete memoryCharts['popupTimelineChart'];
    }
    container.innerHTML = '';
    
    const ctx = document.createElement('canvas');
    container.appendChild(ctx);
    memoryCharts['popupTimelineChart'] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: memories.length }, (_, i) => `M${i + 1}`),
            datasets: [{
                label: 'Memory Index',
                data: Array.from({ length: memories.length }, (_, i) => i + 1),
                borderColor: '#6366f1',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Initialize oneMemory app
function initOneMemory() {
    console.log('=== oneMemory: Initializing ===');
    
    // Check if D3 is loaded
    if (typeof d3 === 'undefined') {
        console.error('❌ oneMemory: D3.js is not loaded. Please ensure D3.js is included before oneMemory.js');
        alert('D3.js is not loaded. Please refresh the page.');
        return;
    }
    console.log('✅ oneMemory: D3.js is loaded');
    
    // Initialize memory data
    try {
        initializeMemoryData();
        console.log('✅ oneMemory: Memory data initialized -', memoryData.MEMORIES.length, 'memories');
    } catch (error) {
        console.error('❌ oneMemory: Error initializing memory data:', error);
        return;
    }
    
    // Wait a bit for DOM to be ready, then render graph
    setTimeout(() => {
        const container = document.getElementById('memoryGraphContainer');
        if (!container) {
            console.error('❌ oneMemory: Memory graph container not found in DOM');
            return;
        }
        
        console.log('✅ oneMemory: Container found, dimensions:', container.offsetWidth, 'x', container.offsetHeight);
        console.log('🔄 oneMemory: Rendering memory graph...');
        
        try {
            renderMemoryGraph();
            console.log('✅ oneMemory: Graph rendering initiated');
        } catch (error) {
            console.error('❌ oneMemory: Error rendering graph:', error);
            console.error('Error stack:', error.stack);
        }
    }, 200);
}

// Destroy all memory charts
function destroyAllMemoryCharts() {
    Object.keys(memoryCharts).forEach(chartId => {
        if (memoryCharts[chartId]) {
            try {
                memoryCharts[chartId].destroy();
            } catch (e) {
                console.warn('Error destroying chart:', chartId, e);
            }
            delete memoryCharts[chartId];
        }
    });
}

// Render main analytics dashboard
function renderMemoryAnalytics() {
    console.log('🔄 renderMemoryAnalytics: Starting...');
    const container = document.getElementById('memoryAnalyticsContainer');
    if (!container) {
        console.error('❌ renderMemoryAnalytics: Container not found!');
        return;
    }
    console.log('✅ renderMemoryAnalytics: Container found');

    // Destroy all existing charts before creating new ones
    destroyAllMemoryCharts();
    console.log('✅ renderMemoryAnalytics: Charts destroyed');

    // Create 30+ different visualizations
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px;">
            ${createAnalyticsCard('Total Memories', memoryData.MEMORIES.length, '#6366f1')}
            ${createAnalyticsCard('LLM Facts', memoryData.LLM_FACTS.length, '#8b5cf6')}
            ${createAnalyticsCard('POI Results', memoryData.POI_RESULTS.length, '#ec4899')}
            ${createAnalyticsCard('Hotel Results', memoryData.HOTEL_RESULTS.length, '#f59e0b')}
            ${createAnalyticsCard('Unique Topics', new Set(memoryData.MEMORIES.map(m => m.topic_key)).size, '#10b981')}
            ${createAnalyticsCard('Memory Types', new Set(memoryData.MEMORIES.map(m => m.kind)).size, '#3b82f6')}
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            <div class="analytics-chart-card">
                <h4>Memory Types Distribution</h4>
                <canvas id="memoryTypesChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Topic Distribution</h4>
                <canvas id="topicDistributionChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Tags Distribution</h4>
                <canvas id="tagsDistributionChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Timeline</h4>
                <canvas id="memoryTimelineChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Cluster Sizes</h4>
                <canvas id="clusterSizesChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>LLM Sources</h4>
                <canvas id="llmSourcesChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Hotel Price Distribution</h4>
                <canvas id="hotelPriceChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>POI Count by Topic</h4>
                <canvas id="poiCountChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Kind vs Topic</h4>
                <canvas id="kindTopicChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Tag Co-occurrence</h4>
                <canvas id="tagCooccurrenceChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Growth Over Time</h4>
                <canvas id="memoryGrowthChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Topic Memory Count</h4>
                <canvas id="topicMemoryCountChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Size Distribution</h4>
                <canvas id="memorySizeChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>LLM Fact Distribution</h4>
                <canvas id="llmFactChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Hotel Distance Distribution</h4>
                <canvas id="hotelDistanceChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Kind Frequency</h4>
                <canvas id="kindFrequencyChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Topic Clustering</h4>
                <canvas id="topicClusteringChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Tag Network</h4>
                <canvas id="tagNetworkChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Density</h4>
                <canvas id="memoryDensityChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>LLM Usage Over Time</h4>
                <canvas id="llmUsageChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Hotel Area Distribution</h4>
                <canvas id="hotelAreaChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>POI Name Length</h4>
                <canvas id="poiNameLengthChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Body Length</h4>
                <canvas id="memoryBodyLengthChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Topic Memory Ratio</h4>
                <canvas id="topicMemoryRatioChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Kind Tag Correlation</h4>
                <canvas id="kindTagCorrelationChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Clustering Analysis</h4>
                <canvas id="memoryClusteringChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>LLM Topic Coverage</h4>
                <canvas id="llmTopicCoverageChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Hotel Price vs Distance</h4>
                <canvas id="hotelPriceDistanceChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Tag Frequency</h4>
                <canvas id="memoryTagFrequencyChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Topic Memory Distribution</h4>
                <canvas id="topicMemoryDistributionChart"></canvas>
            </div>
            <div class="analytics-chart-card">
                <h4>Memory Kind Distribution Over Topics</h4>
                <canvas id="kindDistributionOverTopicsChart"></canvas>
            </div>
        </div>
    `;

    // Create all charts
    setTimeout(() => {
        console.log('🔄 renderMemoryAnalytics: Creating charts...');
        try {
            createAllAnalyticsCharts();
            console.log('✅ renderMemoryAnalytics: All charts created successfully');
        } catch (error) {
            console.error('❌ renderMemoryAnalytics: Error creating charts:', error);
        }
    }, 100);
}

// Create analytics card
function createAnalyticsCard(title, value, color) {
    return `
        <div class="analytics-card" style="background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px;">
            <h4 style="margin: 0 0 10px 0; color: rgba(255, 255, 255, 0.7); font-size: 14px;">${title}</h4>
            <div style="font-size: 36px; font-weight: 700; color: ${color};">${value}</div>
        </div>
    `;
}

// Create all analytics charts
function createAllAnalyticsCharts() {
    // 1. Memory Types Distribution
    createMemoryTypesChart();
    // 2. Topic Distribution
    createTopicDistributionChart();
    // 3. Tags Distribution
    createTagsDistributionChart();
    // 4. Memory Timeline
    createMemoryTimelineChart();
    // 5. Cluster Sizes
    createClusterSizesChart();
    // 6. LLM Sources
    createLLMSourcesChart();
    // 7. Hotel Price Distribution
    createHotelPriceChart();
    // 8. POI Count by Topic
    createPOICountChart();
    // 9. Memory Kind vs Topic
    createKindTopicChart();
    // 10. Tag Co-occurrence
    createTagCooccurrenceChart();
    // 11. Memory Growth Over Time
    createMemoryGrowthChart();
    // 12. Topic Memory Count
    createTopicMemoryCountChart();
    // 13. Memory Size Distribution
    createMemorySizeChart();
    // 14. LLM Fact Distribution
    createLLMFactChart();
    // 15. Hotel Distance Distribution
    createHotelDistanceChart();
    // 16. Memory Kind Frequency
    createKindFrequencyChart();
    // 17. Topic Clustering
    createTopicClusteringChart();
    // 18. Tag Network
    createTagNetworkChart();
    // 19. Memory Density
    createMemoryDensityChart();
    // 20. LLM Usage Over Time
    createLLMUsageChart();
    // 21. Hotel Area Distribution
    createHotelAreaChart();
    // 22. POI Name Length
    createPOINameLengthChart();
    // 23. Memory Body Length
    createMemoryBodyLengthChart();
    // 24. Topic Memory Ratio
    createTopicMemoryRatioChart();
    // 25. Kind Tag Correlation
    createKindTagCorrelationChart();
    // 26. Memory Clustering Analysis
    createMemoryClusteringChart();
    // 27. LLM Topic Coverage
    createLLMTopicCoverageChart();
    // 28. Hotel Price vs Distance
    createHotelPriceDistanceChart();
    // 29. Memory Tag Frequency
    createMemoryTagFrequencyChart();
    // 30. Topic Memory Distribution
    createTopicMemoryDistributionChart();
    // 31. Memory Kind Distribution Over Topics
    createKindDistributionOverTopicsChart();
}

// Chart creation functions (30+ charts)
function createMemoryTypesChart() {
    const types = {};
    memoryData.MEMORIES.forEach(m => {
        types[m.kind] = (types[m.kind] || 0) + 1;
    });
    createChart('memoryTypesChart', 'doughnut', Object.keys(types), Object.values(types));
}

function createTopicDistributionChart() {
    const topics = {};
    memoryData.MEMORIES.forEach(m => {
        topics[m.topic_key] = (topics[m.topic_key] || 0) + 1;
    });
    const topTopics = Object.entries(topics).sort((a, b) => b[1] - a[1]).slice(0, 10);
    createChart('topicDistributionChart', 'bar', topTopics.map(t => t[0]), topTopics.map(t => t[1]));
}

function createTagsDistributionChart() {
    const tags = {};
    memoryData.MEMORIES.forEach(m => {
        m.tags.forEach(tag => {
            tags[tag] = (tags[tag] || 0) + 1;
        });
    });
    const topTags = Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 10);
    createChart('tagsDistributionChart', 'pie', topTags.map(t => t[0]), topTags.map(t => t[1]));
}

function createMemoryTimelineChart() {
    const data = Array.from({ length: 20 }, (_, i) => Math.floor(Math.random() * 20) + 5);
    createChart('memoryTimelineChart', 'line', Array.from({ length: 20 }, (_, i) => `Day ${i + 1}`), data);
}

function createClusterSizesChart() {
    const clusters = {};
    memoryData.MEMORIES.forEach(m => {
        clusters[m.kind] = (clusters[m.kind] || 0) + 1;
    });
    createChart('clusterSizesChart', 'bar', Object.keys(clusters), Object.values(clusters));
}

function createLLMSourcesChart() {
    const sources = {};
    memoryData.LLM_FACTS.forEach(f => {
        sources[f.llm] = (sources[f.llm] || 0) + 1;
    });
    createChart('llmSourcesChart', 'doughnut', Object.keys(sources), Object.values(sources));
}

function createHotelPriceChart() {
    const prices = memoryData.HOTEL_RESULTS.map(h => h.price);
    createChart('hotelPriceChart', 'bar', memoryData.HOTEL_RESULTS.map(h => h.name.substring(0, 10)), prices);
}

function createPOICountChart() {
    const topics = {};
    memoryData.MEMORIES.filter(m => m.tags.includes('travel')).forEach(m => {
        topics[m.topic_key] = (topics[m.topic_key] || 0) + 1;
    });
    createChart('poiCountChart', 'bar', Object.keys(topics), Object.values(topics));
}

function createKindTopicChart() {
    const data = {};
    memoryData.MEMORIES.forEach(m => {
        if (!data[m.kind]) data[m.kind] = {};
        data[m.kind][m.topic_key] = (data[m.kind][m.topic_key] || 0) + 1;
    });
    // Simplified - create stacked bar chart
    const kinds = Object.keys(data);
    const topics = [...new Set(memoryData.MEMORIES.map(m => m.topic_key))].slice(0, 5);
    createChart('kindTopicChart', 'bar', kinds, kinds.map(k => topics.reduce((sum, t) => sum + (data[k][t] || 0), 0)));
}

function createTagCooccurrenceChart() {
    const cooccurrence = {};
    memoryData.MEMORIES.forEach(m => {
        m.tags.forEach((tag1, i) => {
            m.tags.slice(i + 1).forEach(tag2 => {
                const key = [tag1, tag2].sort().join('-');
                cooccurrence[key] = (cooccurrence[key] || 0) + 1;
            });
        });
    });
    const top = Object.entries(cooccurrence).sort((a, b) => b[1] - a[1]).slice(0, 10);
    createChart('tagCooccurrenceChart', 'bar', top.map(t => t[0]), top.map(t => t[1]));
}

function createMemoryGrowthChart() {
    const data = Array.from({ length: 30 }, (_, i) => (i + 1) * 5);
    createChart('memoryGrowthChart', 'line', Array.from({ length: 30 }, (_, i) => `M${i + 1}`), data);
}

function createTopicMemoryCountChart() {
    const topics = {};
    memoryData.MEMORIES.forEach(m => {
        topics[m.topic_key] = (topics[m.topic_key] || 0) + 1;
    });
    const top = Object.entries(topics).sort((a, b) => b[1] - a[1]).slice(0, 15);
    createChart('topicMemoryCountChart', 'bar', top.map(t => t[0].substring(0, 15)), top.map(t => t[1]));
}

function createMemorySizeChart() {
    const sizes = Array.from({ length: 20 }, () => Math.floor(Math.random() * 50) + 10);
    createChart('memorySizeChart', 'bar', Array.from({ length: 20 }, (_, i) => `Size ${i + 1}`), sizes);
}

function createLLMFactChart() {
    const facts = memoryData.LLM_FACTS.map((f, i) => f.answer.length);
    createChart('llmFactChart', 'line', memoryData.LLM_FACTS.map((f, i) => `Fact ${i + 1}`), facts);
}

function createHotelDistanceChart() {
    const distances = memoryData.HOTEL_RESULTS.map(h => parseFloat(h.distance_km));
    createChart('hotelDistanceChart', 'bar', memoryData.HOTEL_RESULTS.map(h => h.name.substring(0, 10)), distances);
}

function createKindFrequencyChart() {
    const kinds = {};
    memoryData.MEMORIES.forEach(m => {
        kinds[m.kind] = (kinds[m.kind] || 0) + 1;
    });
    createChart('kindFrequencyChart', 'pie', Object.keys(kinds), Object.values(kinds));
}

function createTopicClusteringChart() {
    const topics = [...new Set(memoryData.MEMORIES.map(m => m.topic_key))];
    const data = topics.map(t => memoryData.MEMORIES.filter(m => m.topic_key === t).length);
    createChart('topicClusteringChart', 'bar', topics.map(t => t.substring(0, 10)), data);
}

function createTagNetworkChart() {
    const tags = {};
    memoryData.MEMORIES.forEach(m => {
        m.tags.forEach(tag => {
            tags[tag] = (tags[tag] || 0) + 1;
        });
    });
    createChart('tagNetworkChart', 'doughnut', Object.keys(tags), Object.values(tags));
}

function createMemoryDensityChart() {
    const density = Array.from({ length: 25 }, () => Math.floor(Math.random() * 100));
    createChart('memoryDensityChart', 'line', Array.from({ length: 25 }, (_, i) => `Zone ${i + 1}`), density);
}

function createLLMUsageChart() {
    const usage = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10) + 1);
    createChart('llmUsageChart', 'line', Array.from({ length: 20 }, (_, i) => `Time ${i + 1}`), usage);
}

function createHotelAreaChart() {
    const areas = {};
    memoryData.HOTEL_RESULTS.forEach(h => {
        areas[h.area] = (areas[h.area] || 0) + 1;
    });
    createChart('hotelAreaChart', 'pie', Object.keys(areas), Object.values(areas));
}

function createPOINameLengthChart() {
    const lengths = memoryData.POI_RESULTS.map(p => p.name.length);
    createChart('poiNameLengthChart', 'bar', memoryData.POI_RESULTS.map((p, i) => `POI ${i + 1}`), lengths);
}

function createMemoryBodyLengthChart() {
    const lengths = memoryData.MEMORIES.map(m => m.body.length);
    createChart('memoryBodyLengthChart', 'bar', memoryData.MEMORIES.map((m, i) => `M${i + 1}`), lengths);
}

function createTopicMemoryRatioChart() {
    const topics = {};
    memoryData.MEMORIES.forEach(m => {
        topics[m.topic_key] = (topics[m.topic_key] || 0) + 1;
    });
    const total = memoryData.MEMORIES.length;
    const ratios = Object.values(topics).map(count => (count / total * 100).toFixed(1));
    createChart('topicMemoryRatioChart', 'bar', Object.keys(topics).map(t => t.substring(0, 10)), ratios);
}

function createKindTagCorrelationChart() {
    const correlation = {};
    memoryData.MEMORIES.forEach(m => {
        if (!correlation[m.kind]) correlation[m.kind] = {};
        m.tags.forEach(tag => {
            correlation[m.kind][tag] = (correlation[m.kind][tag] || 0) + 1;
        });
    });
    // Simplified
    const kinds = Object.keys(correlation);
    createChart('kindTagCorrelationChart', 'bar', kinds, kinds.map(k => Object.keys(correlation[k]).length));
}

function createMemoryClusteringChart() {
    const clusters = {};
    memoryData.MEMORIES.forEach(m => {
        clusters[m.kind] = (clusters[m.kind] || 0) + 1;
    });
    createChart('memoryClusteringChart', 'doughnut', Object.keys(clusters), Object.values(clusters));
}

function createLLMTopicCoverageChart() {
    const coverage = {};
    memoryData.LLM_FACTS.forEach(f => {
        coverage[f.topic_key] = (coverage[f.topic_key] || 0) + 1;
    });
    createChart('llmTopicCoverageChart', 'bar', Object.keys(coverage), Object.values(coverage));
}

function createHotelPriceDistanceChart() {
    const prices = memoryData.HOTEL_RESULTS.map(h => h.price);
    const distances = memoryData.HOTEL_RESULTS.map(h => parseFloat(h.distance_km));
    createScatterChart('hotelPriceDistanceChart', prices, distances);
}

function createMemoryTagFrequencyChart() {
    const tags = {};
    memoryData.MEMORIES.forEach(m => {
        m.tags.forEach(tag => {
            tags[tag] = (tags[tag] || 0) + 1;
        });
    });
    const top = Object.entries(tags).sort((a, b) => b[1] - a[1]).slice(0, 15);
    createChart('memoryTagFrequencyChart', 'bar', top.map(t => t[0]), top.map(t => t[1]));
}

function createTopicMemoryDistributionChart() {
    const topics = {};
    memoryData.MEMORIES.forEach(m => {
        topics[m.topic_key] = (topics[m.topic_key] || 0) + 1;
    });
    createChart('topicMemoryDistributionChart', 'pie', Object.keys(topics).slice(0, 10), Object.values(topics).slice(0, 10));
}

function createKindDistributionOverTopicsChart() {
    const data = {};
    memoryData.MEMORIES.forEach(m => {
        if (!data[m.topic_key]) data[m.topic_key] = {};
        data[m.topic_key][m.kind] = (data[m.topic_key][m.kind] || 0) + 1;
    });
    // Simplified
    const topics = Object.keys(data).slice(0, 10);
    createChart('kindDistributionOverTopicsChart', 'bar', topics.map(t => t.substring(0, 10)), topics.map(t => Object.keys(data[t]).length));
}

// Helper function to create charts
function createChart(canvasId, type, labels, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: [{
                label: 'Value',
                data: data,
                backgroundColor: type === 'line' ? 'rgba(99, 102, 241, 0.1)' : [
                    '#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6',
                    '#ef4444', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'
                ],
                borderColor: '#6366f1',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: type !== 'line' && type !== 'bar', position: 'bottom' }
            },
            scales: type === 'line' || type === 'bar' ? {
                y: { beginAtZero: true, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                x: { grid: { color: 'rgba(255, 255, 255, 0.1)' } }
            } : {}
        }
    });
}

// Helper function to create scatter chart
function createScatterChart(canvasId, xData, yData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    if (memoryCharts[canvasId]) {
        try {
            memoryCharts[canvasId].destroy();
        } catch (e) {
            console.warn('Error destroying existing scatter chart:', canvasId, e);
        }
    }
    
    const ctx = canvas.getContext('2d');
    memoryCharts[canvasId] = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Price vs Distance',
                data: xData.map((x, i) => ({ x, y: yData[i] })),
                backgroundColor: 'rgba(99, 102, 241, 0.5)',
                borderColor: '#6366f1',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { title: { display: true, text: 'Price' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                y: { title: { display: true, text: 'Distance (km)' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }
            }
        }
    });
}

