// One Agent - Directed Graph Visualization
// This file handles the agent network graph visualization

// Track currently selected node
let selectedNode = null;

// Define all agents with their properties
const agents = [
    {
        id: 'macbook',
        name: "Kasyap's MacBook",
        type: 'computer',
        icon: '💻',
        position: { x: 0, y: 0 }, // Center
        importance: 'critical',
        status: 'online',
        data: {
            cpu: 'M2 Pro 12-core',
            memory: '32GB',
            storage: '1TB SSD (78% used)',
            battery: '100%',
            uptime: '12 days',
            lastBackup: '2 hours ago',
            activeApps: ['VS Code', 'Chrome', 'Terminal'],
            network: 'WiFi Connected',
            location: 'Home Office'
        },
        actions: ['Restart', 'Sleep', 'Backup Now', 'Check Updates'],
        connections: ['bidirectional', 'mobile', 'ipad', 'car', 'banking', 'weather', 'mail', 'sms', 'gaming', 'book', 'water', 'garden', 'electrical', 'stock', 'work', 'health', 'fitness', 'music', 'calendar', 'notes']
    },
    {
        id: 'mobile',
        name: 'iPhone 15 Pro',
        type: 'mobile',
        icon: '📱',
        position: { x: -200, y: -150 },
        importance: 'critical',
        status: 'online',
        data: {
            battery: '87%',
            signal: '5G (4 bars)',
            storage: '256GB (45% used)',
            lastSync: 'Just now',
            location: 'Home',
            activeCalls: 0,
            unreadMessages: 3,
            recentApps: ['Messages', 'Mail', 'Safari']
        },
        actions: ['Call', 'Message', 'Sync', 'Find My Phone'],
        connections: ['bidirectional', 'macbook', 'ipad', 'car', 'banking', 'mail', 'sms', 'work']
    },
    {
        id: 'ipad',
        name: 'iPad Pro',
        type: 'tablet',
        icon: '📱',
        position: { x: 200, y: -150 },
        importance: 'high',
        status: 'online',
        data: {
            battery: '92%',
            storage: '512GB (32% used)',
            lastUsed: '1 hour ago',
            activeApp: 'Procreate',
            location: 'Home Office'
        },
        actions: ['Wake', 'Sync', 'Check Updates'],
        connections: ['bidirectional', 'macbook', 'mobile', 'cloud']
    },
    {
        id: 'car',
        name: 'Tesla Model 3',
        type: 'vehicle',
        icon: '🚗',
        position: { x: -300, y: 100 },
        importance: 'high',
        status: 'charging',
        data: {
            battery: '78%',
            charging: 'Yes (Level 2, 32kW)',
            range: '312 miles',
            tirePressure: '42 PSI (all tires)',
            milesDriven: '12,450 miles',
            lastService: '11,200 miles',
            nextService: '13,000 miles (in 550 miles)',
            location: 'Home Garage',
            temperature: '72°F',
            alerts: ['Service due in 550 miles', 'Tire rotation recommended']
        },
        actions: ['Start', 'Stop', 'Set GPS', 'Unlock', 'Lock', 'Climate Control'],
        connections: ['bidirectional', 'macbook', 'mobile'],
        locationRestricted: true
    },
    {
        id: 'banking',
        name: 'Banking Agent',
        type: 'financial',
        icon: '🏦',
        position: { x: 300, y: 100 },
        importance: 'critical',
        status: 'online',
        data: {
            checkingBalance: '$45,230.50',
            savingsBalance: '$128,900.00',
            creditCardBalance: '$2,340.00',
            recentTransactions: '5 today',
            upcomingPayments: 'Mortgage: $2,400 (Due in 3 days)',
            investmentValue: '$89,450.00',
            alerts: ['Credit card payment due in 5 days']
        },
        actions: ['View Statements', 'Transfer Funds', 'Pay Bills', 'Close Account', 'Set Alerts'],
        connections: ['bidirectional', 'macbook', 'mobile', 'stock']
    },
    {
        id: 'weather',
        name: 'Weather Agent',
        type: 'service',
        icon: '🌤️',
        position: { x: 0, y: -250 },
        importance: 'medium',
        status: 'online',
        data: {
            currentTemp: '72°F',
            condition: 'Partly Cloudy',
            humidity: '65%',
            windSpeed: '8 mph',
            forecast: 'Sunny tomorrow, 75°F',
            alerts: 'None',
            location: 'Current Location'
        },
        actions: ['Refresh', 'Set Location', 'View Forecast'],
        connections: ['bidirectional', 'macbook', 'mobile', 'car', 'garden', 'electrical']
    },
    {
        id: 'mail',
        name: 'Mail Agent',
        type: 'communication',
        icon: '📧',
        position: { x: -150, y: 200 },
        importance: 'high',
        status: 'online',
        data: {
            unread: 12,
            total: '1,234',
            recent: '3 emails in last hour',
            important: 2,
            spam: 0,
            lastSync: 'Just now',
            accounts: ['Gmail', 'Work Email']
        },
        actions: ['Compose', 'Check Mail', 'Mark Read', 'Archive', 'Delete'],
        connections: ['bidirectional', 'macbook', 'mobile', 'work']
    },
    {
        id: 'sms',
        name: 'SMS Agent',
        type: 'communication',
        icon: '💬',
        position: { x: 150, y: 200 },
        importance: 'high',
        status: 'online',
        data: {
            unread: 3,
            total: '1,456',
            recent: 'Last message 5 min ago',
            contacts: 234,
            lastBackup: '1 hour ago'
        },
        actions: ['Send Message', 'View Threads', 'Backup Messages'],
        connections: ['bidirectional', 'macbook', 'mobile']
    },
    {
        id: 'gaming',
        name: 'Gaming Agent',
        type: 'entertainment',
        icon: '🎮',
        position: { x: -250, y: -50 },
        importance: 'medium',
        status: 'online',
        data: {
            currentGame: 'None',
            library: '45 games',
            playtime: '12.5 hours this week',
            achievements: '234 unlocked',
            friends: '12 online',
            downloads: 'None pending'
        },
        actions: ['Launch Game', 'View Library', 'Check Friends', 'Update Games'],
        connections: ['bidirectional', 'macbook']
    },
    {
        id: 'book',
        name: 'Book Agent',
        type: 'entertainment',
        icon: '📚',
        position: { x: 250, y: -50 },
        importance: 'low',
        status: 'online',
        data: {
            library: '127 books',
            currentlyReading: 'The Innovator\'s Dilemma',
            progress: '45%',
            readingTime: '2.5 hours this week',
            recommendations: '5 new books'
        },
        actions: ['Open Book', 'View Library', 'Get Recommendations', 'Sync'],
        connections: ['bidirectional', 'macbook', 'ipad']
    },
    {
        id: 'water',
        name: 'Water Agent',
        type: 'home',
        icon: '💧',
        position: { x: -400, y: 0 },
        importance: 'medium',
        status: 'online',
        data: {
            usage: '45 gallons today',
            monthlyUsage: '1,250 gallons',
            quality: 'Excellent',
            filterStatus: 'Good (changed 2 months ago)',
            nextFilterChange: 'In 4 months',
            alerts: 'None'
        },
        actions: ['Check Quality', 'Schedule Filter Change', 'View Usage Report'],
        connections: ['bidirectional', 'macbook', 'electrical']
    },
    {
        id: 'garden',
        name: 'Garden Agent',
        type: 'home',
        icon: '🌱',
        position: { x: 400, y: 0 },
        importance: 'low',
        status: 'online',
        data: {
            soilMoisture: 'Optimal (65%)',
            temperature: '72°F',
            humidity: '65%',
            lastWatered: 'Yesterday',
            nextWatering: 'Tomorrow 6 AM',
            plantHealth: 'All healthy',
            alerts: 'None'
        },
        actions: ['Water Now', 'Schedule Watering', 'Check Soil', 'View Report'],
        connections: ['bidirectional', 'macbook', 'weather', 'electrical']
    },
    {
        id: 'electrical',
        name: 'Electrical Agent',
        type: 'home',
        icon: '💡',
        position: { x: -350, y: 150 },
        importance: 'high',
        status: 'online',
        data: {
            powerUsage: '2.4 kW',
            monthlyBill: '$145.30',
            lightsOn: 8,
            lightsOff: 12,
            cameras: '3 active',
            smartDevices: '15 connected',
            alerts: 'None'
        },
        actions: ['Light On', 'Light Off', 'Rotate Camera', 'View Cameras', 'Schedule', 'Energy Report'],
        connections: ['bidirectional', 'macbook', 'mobile', 'water', 'garden', 'weather']
    },
    {
        id: 'stock',
        name: 'Stock Agent',
        type: 'financial',
        icon: '📈',
        position: { x: 350, y: 150 },
        importance: 'high',
        status: 'online',
        data: {
            portfolioValue: '$89,450.00',
            dailyChange: '+$1,234.50 (+1.4%)',
            currentHoldings: '12 stocks',
            topGainer: 'AAPL: +2.3%',
            topLoser: 'TSLA: -1.2%',
            projectedIncome: '$12,500/month',
            alerts: 'None'
        },
        actions: ['View Portfolio', 'Trade', 'View Charts', 'Set Alerts', 'Research'],
        connections: ['bidirectional', 'macbook', 'banking']
    },
    {
        id: 'work',
        name: 'Work Agent',
        type: 'productivity',
        icon: '💼',
        position: { x: 0, y: 250 },
        importance: 'critical',
        status: 'online',
        data: {
            upcomingMeetings: '3 today',
            deadlines: '2 this week',
            tasks: '12 pending',
            completed: '8 today',
            schedule: 'Next: Team Standup (10 AM)',
            projects: '5 active',
            alerts: ['Project review due tomorrow']
        },
        actions: ['View Calendar', 'Check Tasks', 'Join Meeting', 'View Projects'],
        connections: ['bidirectional', 'macbook', 'mobile', 'mail', 'calendar']
    },
    {
        id: 'health',
        name: 'Health Agent',
        type: 'health',
        icon: '🏥',
        position: { x: -200, y: 300 },
        importance: 'high',
        status: 'online',
        data: {
            heartRate: '72 BPM',
            steps: '8,450 today',
            sleep: '7.5 hours last night',
            calories: '2,340 burned',
            nextAppointment: 'Dentist: Next week',
            medications: 'None scheduled',
            alerts: 'None'
        },
        actions: ['View Health Data', 'Schedule Appointment', 'View Reports'],
        connections: ['bidirectional', 'macbook', 'mobile', 'fitness']
    },
    {
        id: 'fitness',
        name: 'Fitness Agent',
        type: 'health',
        icon: '🏋️',
        position: { x: 200, y: 300 },
        importance: 'medium',
        status: 'online',
        data: {
            workouts: '3 this week',
            nextWorkout: 'Tomorrow 6 AM',
            caloriesBurned: '1,250 this week',
            activeMinutes: '180 minutes',
            goals: 'On track',
            alerts: 'None'
        },
        actions: ['Start Workout', 'View Progress', 'Set Goals', 'View Schedule'],
        connections: ['bidirectional', 'macbook', 'health']
    },
    {
        id: 'music',
        name: 'Music Agent',
        type: 'entertainment',
        icon: '🎵',
        position: { x: -100, y: -300 },
        importance: 'low',
        status: 'online',
        data: {
            currentSong: 'None',
            library: '2,345 songs',
            playlists: '12 playlists',
            recentlyPlayed: '5 songs',
            recommendations: '10 new songs'
        },
        actions: ['Play', 'Pause', 'Next', 'View Library', 'Create Playlist'],
        connections: ['bidirectional', 'macbook', 'mobile', 'car']
    },
    {
        id: 'calendar',
        name: 'Calendar Agent',
        type: 'productivity',
        icon: '📅',
        position: { x: 100, y: -300 },
        importance: 'high',
        status: 'online',
        data: {
            todayEvents: '5 events',
            upcoming: '3 this week',
            reminders: '2 pending',
            lastSync: 'Just now',
            calendars: '3 active'
        },
        actions: ['View Calendar', 'Add Event', 'Sync', 'View Reminders'],
        connections: ['bidirectional', 'macbook', 'mobile', 'work']
    },
    {
        id: 'notes',
        name: 'Notes Agent',
        type: 'productivity',
        icon: '📝',
        position: { x: -50, y: 350 },
        importance: 'medium',
        status: 'online',
        data: {
            totalNotes: '234 notes',
            recent: '5 today',
            pinned: '3',
            lastSync: 'Just now',
            storage: '45 MB'
        },
        actions: ['Create Note', 'View Notes', 'Search', 'Sync'],
        connections: ['bidirectional', 'macbook', 'mobile', 'ipad']
    },
    {
        id: 'cloud',
        name: 'Cloud Agent',
        type: 'storage',
        icon: '☁️',
        position: { x: 50, y: 350 },
        importance: 'high',
        status: 'online',
        data: {
            storage: '245 GB / 1 TB',
            usage: '24.5%',
            lastBackup: '2 hours ago',
            files: '12,345 files',
            shared: '45 files',
            alerts: 'None'
        },
        actions: ['Upload', 'Download', 'Sync', 'View Files', 'Share'],
        connections: ['bidirectional', 'macbook', 'mobile', 'ipad', 'notes']
    }
];

// Define connections between agents
const connections = [
    { from: 'macbook', to: 'mobile', type: 'bidirectional', importance: 'critical' },
    { from: 'macbook', to: 'ipad', type: 'bidirectional', importance: 'high' },
    { from: 'macbook', to: 'car', type: 'bidirectional', importance: 'high' },
    { from: 'macbook', to: 'banking', type: 'bidirectional', importance: 'critical' },
    { from: 'macbook', to: 'weather', type: 'bidirectional', importance: 'medium' },
    { from: 'macbook', to: 'mail', type: 'bidirectional', importance: 'high' },
    { from: 'macbook', to: 'sms', type: 'bidirectional', importance: 'high' },
    { from: 'macbook', to: 'gaming', type: 'bidirectional', importance: 'medium' },
    { from: 'macbook', to: 'book', type: 'bidirectional', importance: 'low' },
    { from: 'macbook', to: 'water', type: 'bidirectional', importance: 'medium' },
    { from: 'macbook', to: 'garden', type: 'bidirectional', importance: 'low' },
    { from: 'macbook', to: 'electrical', type: 'bidirectional', importance: 'high' },
    { from: 'macbook', to: 'stock', type: 'bidirectional', importance: 'high' },
    { from: 'macbook', to: 'work', type: 'bidirectional', importance: 'critical' },
    { from: 'macbook', to: 'health', type: 'bidirectional', importance: 'high' },
    { from: 'macbook', to: 'fitness', type: 'bidirectional', importance: 'medium' },
    { from: 'macbook', to: 'music', type: 'bidirectional', importance: 'low' },
    { from: 'macbook', to: 'calendar', type: 'bidirectional', importance: 'high' },
    { from: 'macbook', to: 'notes', type: 'bidirectional', importance: 'medium' },
    { from: 'macbook', to: 'cloud', type: 'bidirectional', importance: 'high' },
    { from: 'mobile', to: 'ipad', type: 'bidirectional', importance: 'medium' },
    { from: 'mobile', to: 'car', type: 'bidirectional', importance: 'high' },
    { from: 'mobile', to: 'banking', type: 'bidirectional', importance: 'high' },
    { from: 'mobile', to: 'mail', type: 'bidirectional', importance: 'high' },
    { from: 'mobile', to: 'sms', type: 'bidirectional', importance: 'high' },
    { from: 'mobile', to: 'work', type: 'bidirectional', importance: 'high' },
    { from: 'ipad', to: 'cloud', type: 'bidirectional', importance: 'medium' },
    { from: 'banking', to: 'stock', type: 'bidirectional', importance: 'high' },
    { from: 'weather', to: 'car', type: 'unidirectional', importance: 'low' },
    { from: 'weather', to: 'garden', type: 'bidirectional', importance: 'medium' },
    { from: 'weather', to: 'electrical', type: 'bidirectional', importance: 'low' },
    { from: 'electrical', to: 'water', type: 'bidirectional', importance: 'medium' },
    { from: 'electrical', to: 'garden', type: 'bidirectional', importance: 'medium' },
    { from: 'work', to: 'mail', type: 'bidirectional', importance: 'high' },
    { from: 'work', to: 'calendar', type: 'bidirectional', importance: 'high' },
    { from: 'health', to: 'fitness', type: 'bidirectional', importance: 'high' },
    { from: 'music', to: 'car', type: 'unidirectional', importance: 'low' },
    { from: 'notes', to: 'cloud', type: 'bidirectional', importance: 'high' }
];

// Color coding based on importance
const importanceColors = {
    critical: '#ef4444', // red
    high: '#f59e0b', // amber
    medium: '#3b82f6', // blue
    low: '#10b981' // green
};

// Initialize the graph visualization
window.initOneAgent = function() {
    // Check if D3.js is loaded
    if (typeof d3 === 'undefined') {
        console.error('D3.js is not loaded. Please check if the library is included.');
        return;
    }
    
    const container = document.getElementById('oneAgentGraph');
    if (!container) {
        console.error('One Agent graph container not found');
        return;
    }
    
    // Clear any existing SVG
    d3.select('#oneAgentGraph').selectAll('*').remove();
    
    // Get container dimensions (accounting for assistant panel)
    const rect = container.getBoundingClientRect();
    const width = rect.width || 900; // Reduced because assistant takes 300px
    const height = rect.height || 800;
    
    const svg = d3.select('#oneAgentGraph')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('background', 'rgba(10, 10, 18, 0.3)')
        .style('display', 'block');
    
    const g = svg.append('g');
    
    // Calculate positions for nodes in a random graph layout
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Find macbook index
    const macbookIndex = agents.findIndex(a => a.id === 'macbook');
    
    // Place MacBook in center as big node
    agents.forEach((agent, index) => {
        if (agent.id === 'macbook') {
            agent.position = { x: centerX, y: centerY };
        } else {
            // Random positions around the center with some clustering
            const angle = Math.random() * 2 * Math.PI;
            const distance = 150 + Math.random() * 200; // Random distance from center
            const offsetX = (Math.random() - 0.5) * 100; // Small random offset
            const offsetY = (Math.random() - 0.5) * 100;
            
            agent.position = {
                x: centerX + distance * Math.cos(angle) + offsetX,
                y: centerY + distance * Math.sin(angle) + offsetY
            };
            
            // Ensure nodes stay within bounds
            agent.position.x = Math.max(80, Math.min(width - 80, agent.position.x));
            agent.position.y = Math.max(80, Math.min(height - 80, agent.position.y));
        }
    });
    
    // Add arrow markers first (before edges)
    const defs = svg.append('defs');
    
    // Glow filter for labels
    const glowFilter = defs.append('filter')
        .attr('id', 'glow')
        .attr('x', '-100%')
        .attr('y', '-100%')
        .attr('width', '300%')
        .attr('height', '300%');
    
    // Create colored glow
    glowFilter.append('feGaussianBlur')
        .attr('stdDeviation', '4')
        .attr('result', 'coloredBlur');
    
    glowFilter.append('feColorMatrix')
        .attr('in', 'coloredBlur')
        .attr('type', 'matrix')
        .attr('values', '0 0 0 0 0.6  0 0 0 0 0.7  0 0 0 0 1  0 0 0 1 0')
        .attr('result', 'coloredBlur');
    
    const feMerge = glowFilter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'coloredBlur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
    
    // Arrow marker for unidirectional
    defs.append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 30)
        .attr('refY', 5)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .attr('fill', '#6b7280');
    
    // Arrow marker for bidirectional (both ends)
    defs.append('marker')
        .attr('id', 'arrowhead-both')
        .attr('viewBox', '0 0 10 10')
        .attr('refX', 30)
        .attr('refY', 5)
        .attr('markerWidth', 8)
        .attr('markerHeight', 8)
        .attr('orient', 'auto')
        .append('path')
        .attr('d', 'M 0 0 L 10 5 L 0 10 z')
        .attr('fill', '#6366f1');
    
    // Draw connections (edges) - draw after markers
    const edges = g.selectAll('.edge')
        .data(connections)
        .enter()
        .append('line')
        .attr('class', 'edge')
        .attr('x1', d => {
            const fromAgent = agents.find(a => a.id === d.from);
            return fromAgent ? fromAgent.position.x : 0;
        })
        .attr('y1', d => {
            const fromAgent = agents.find(a => a.id === d.from);
            return fromAgent ? fromAgent.position.y : 0;
        })
        .attr('x2', d => {
            const toAgent = agents.find(a => a.id === d.to);
            return toAgent ? toAgent.position.x : 0;
        })
        .attr('y2', d => {
            const toAgent = agents.find(a => a.id === d.to);
            return toAgent ? toAgent.position.y : 0;
        })
        .attr('stroke', d => importanceColors[d.importance] || '#6b7280')
        .attr('stroke-width', d => d.importance === 'critical' ? 2 : d.importance === 'high' ? 1.5 : 1)
        .attr('opacity', 0.4)
        .attr('stroke-dasharray', '5,5') // Dotted line
        .attr('marker-end', d => d.type === 'unidirectional' ? 'url(#arrowhead)' : 'url(#arrowhead-both)');
    
    // Draw nodes (agents)
    const nodes = g.selectAll('.node')
        .data(agents)
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.position.x},${d.position.y})`)
        .style('cursor', 'pointer');
    
    // Add circles for nodes - MacBook is bigger
    nodes.append('circle')
        .attr('r', d => d.id === 'macbook' ? 50 : 30)
        .attr('fill', d => importanceColors[d.importance] || '#6b7280')
        .attr('stroke', '#fff')
        .attr('stroke-width', d => d.id === 'macbook' ? 3 : 2)
        .attr('opacity', 0.8);
    
    // Add icons - MacBook icon is bigger
    nodes.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', d => d.id === 'macbook' ? 8 : 5)
        .attr('font-size', d => d.id === 'macbook' ? '36px' : '24px')
        .text(d => d.icon);
    
    // Add labels - MacBook label positioned further down
    const labels = nodes.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', d => d.id === 'macbook' ? 70 : 50)
        .attr('font-size', d => d.id === 'macbook' ? '13px' : '11px')
        .attr('fill', '#fff')
        .attr('font-weight', d => d.id === 'macbook' ? '600' : '500')
        .attr('text-shadow', '0 1px 2px rgba(0, 0, 0, 0.8)')
        .attr('class', 'node-label')
        .text(d => d.name);
    
    // Add hover effect for labels (visual feedback only)
    nodes.on('mouseover', function(event, d) {
        if (selectedNode !== d.id) {
            // Only show hover glow if not already selected
            const label = d3.select(this).select('.node-label');
            label
                .attr('filter', 'url(#glow)')
                .style('fill', '#a5b4fc')
                .transition()
                .duration(200)
                .style('fill', '#c7d2fe');
        }
    })
    .on('mouseout', function(event, d) {
        if (selectedNode !== d.id) {
            // Only remove hover glow if not selected
            const label = d3.select(this).select('.node-label');
            label
                .transition()
                .duration(200)
                .style('fill', '#fff')
                .on('end', function() {
                    d3.select(this).attr('filter', null);
                });
        }
    })
    .on('click', function(event, d) {
        event.stopPropagation(); // Prevent zoom when clicking nodes
        
        // If clicking the same node, deselect it
        if (selectedNode === d.id) {
            // Deselect current node
            hideAgentTooltip();
            const currentLabel = d3.select(this).select('.node-label');
            currentLabel
                .transition()
                .duration(200)
                .style('fill', '#fff')
                .on('end', function() {
                    d3.select(this).attr('filter', null);
                });
            selectedNode = null;
        } else {
            // Hide previous tooltip and remove glow from previous node
            if (selectedNode) {
                hideAgentTooltip();
                // Remove glow from previously selected node
                nodes.each(function(nodeData) {
                    if (nodeData.id === selectedNode) {
                        const prevLabel = d3.select(this).select('.node-label');
                        prevLabel
                            .transition()
                            .duration(200)
                            .style('fill', '#fff')
                            .on('end', function() {
                                d3.select(this).attr('filter', null);
                            });
                    }
                });
            }
            
            // Select new node
            selectedNode = d.id;
            showAgentTooltip(event, d);
            
            // Add persistent glow effect to selected node
            const label = d3.select(this).select('.node-label');
            label
                .attr('filter', 'url(#glow)')
                .style('fill', '#a5b4fc')
                .transition()
                .duration(200)
                .style('fill', '#c7d2fe');
        }
    });
    
    // Add zoom and pan first
    const zoom = d3.zoom()
        .scaleExtent([0.5, 2])
        .on('zoom', (event) => {
            g.attr('transform', event.transform);
            
            // Update tooltip position if a node is selected
            if (selectedNode) {
                const tooltip = d3.select('#agentTooltip');
                if (!tooltip.empty()) {
                    // Find the selected node and update tooltip position
                    nodes.each(function(nodeData) {
                        if (nodeData.id === selectedNode) {
                            const nodeElement = d3.select(this);
                            const transform = d3.zoomTransform(svg.node());
                            const nodeX = (nodeData.position.x * transform.k) + transform.x;
                            const nodeY = (nodeData.position.y * transform.k) + transform.y;
                            
                            tooltip
                                .style('left', (nodeX + 20) + 'px')
                                .style('top', (nodeY - 10) + 'px');
                        }
                    });
                }
            }
        })
        .on('start', function(event) {
            // Hide tooltip when starting to zoom/pan on background
            if (event.sourceEvent && event.sourceEvent.type === 'mousedown') {
                // Only hide if clicking on background, not on nodes
                const target = event.sourceEvent.target;
                if (!target || (!target.closest('.node') && target.tagName !== 'circle' && target.tagName !== 'text')) {
                    hideAgentTooltip();
                    if (selectedNode) {
                        // Remove glow from selected node
                        nodes.each(function(nodeData) {
                            if (nodeData.id === selectedNode) {
                                const label = d3.select(this).select('.node-label');
                                label
                                    .transition()
                                    .duration(200)
                                    .style('fill', '#fff')
                                    .on('end', function() {
                                        d3.select(this).attr('filter', null);
                                    });
                            }
                        });
                        selectedNode = null;
                    }
                }
            }
        });
    
    svg.call(zoom);
    
    // Add drag behavior to nodes (after zoom setup)
    const drag = d3.drag()
        .on('start', function(event, d) {
            d3.select(this).raise().attr('stroke', '#fff').attr('stroke-width', d.id === 'macbook' ? 4 : 3);
            event.sourceEvent.stopPropagation(); // Prevent zoom when dragging nodes
        })
        .on('drag', function(event, d) {
            // Update node position (event.x and event.y are already in the correct coordinate space)
            d.position.x = event.x;
            d.position.y = event.y;
            
            // Update node transform
            d3.select(this).attr('transform', `translate(${d.position.x},${d.position.y})`);
            
            // Update tooltip position if this node is selected
            if (selectedNode === d.id) {
                const tooltip = d3.select('#agentTooltip');
                if (!tooltip.empty()) {
                    const transform = d3.zoomTransform(svg.node());
                    const nodeX = (d.position.x * transform.k) + transform.x;
                    const nodeY = (d.position.y * transform.k) + transform.y;
                    
                    tooltip
                        .style('left', (nodeX + 20) + 'px')
                        .style('top', (nodeY - 10) + 'px');
                }
            }
            
            // Update all edges connected to this node
            edges.each(function(edgeData) {
                const edge = d3.select(this);
                let updateNeeded = false;
                
                if (edgeData.from === d.id) {
                    edge.attr('x1', d.position.x).attr('y1', d.position.y);
                    updateNeeded = true;
                }
                if (edgeData.to === d.id) {
                    edge.attr('x2', d.position.x).attr('y2', d.position.y);
                    updateNeeded = true;
                }
                
                // Re-animate edge if it was updated
                if (updateNeeded) {
                    const length = edge.node().getTotalLength();
                    if (length > 0) {
                        edge.attr('stroke-dasharray', '5,5')
                            .attr('stroke-dashoffset', 0);
                    }
                }
            });
        })
        .on('end', function(event, d) {
            d3.select(this).attr('stroke', '#fff').attr('stroke-width', d.id === 'macbook' ? 3 : 2);
            // Re-animate edges after drag ends
            animateEdges(edges);
        });
    
    nodes.call(drag);
    
    // Animate edges
    animateEdges(edges);
    
    // Force a redraw to ensure visibility
    setTimeout(() => {
        svg.style('display', 'block');
        container.style('display', 'block');
    }, 100);
    
    console.log('One Agent graph initialized successfully');
};

function showAgentTooltip(event, agent) {
    // Remove any existing tooltip first
    hideAgentTooltip();
    
    const tooltip = d3.select('body').append('div')
        .attr('class', 'agent-tooltip')
        .attr('id', 'agentTooltip')
        .style('opacity', 0)
        .style('position', 'fixed')
        .style('background', 'rgba(10, 10, 18, 0.98)')
        .style('border', '1px solid rgba(99, 102, 241, 0.5)')
        .style('border-radius', '12px')
        .style('padding', '20px')
        .style('max-width', '350px')
        .style('z-index', '10000')
        .style('box-shadow', '0 10px 40px rgba(0, 0, 0, 0.5)');
    
    let html = `
        <div style="margin-bottom: 15px;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 5px;">${agent.icon} ${agent.name}</div>
            <div style="font-size: 12px; color: rgba(255, 255, 255, 0.6);">${agent.type} • ${agent.status}</div>
        </div>
        <div style="margin-bottom: 15px;">
            <div style="font-size: 13px; font-weight: 500; margin-bottom: 8px; color: rgba(99, 102, 241, 0.9);">Information:</div>
    `;
    
    Object.entries(agent.data).forEach(([key, value]) => {
        html += `<div style="font-size: 11px; color: rgba(255, 255, 255, 0.7); margin-bottom: 4px;">• ${key}: ${value}</div>`;
    });
    
    html += `</div><div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
        <div style="font-size: 13px; font-weight: 500; margin-bottom: 8px; color: rgba(99, 102, 241, 0.9);">Actions:</div>
    `;
    
    agent.actions.forEach(action => {
        html += `<button class="agent-action-btn" onclick="handleAgentAction('${agent.id}', '${action}')" style="margin: 4px; padding: 6px 12px; background: rgba(99, 102, 241, 0.2); border: 1px solid rgba(99, 102, 241, 0.4); border-radius: 6px; color: white; font-size: 11px; cursor: pointer;">${action}</button>`;
    });
    
    html += `</div>`;
    
    // Position tooltip relative to viewport (fixed positioning)
    const rect = event.target.getBoundingClientRect();
    const tooltipX = rect.left + rect.width / 2;
    const tooltipY = rect.top + rect.height / 2;
    
    tooltip.html(html)
        .style('left', (tooltipX + 20) + 'px')
        .style('top', (tooltipY - 10) + 'px')
        .transition()
        .duration(200)
        .style('opacity', 1);
    
    // Store tooltip position relative to node for updates during zoom/pan
    tooltip.datum({ agentId: agent.id, nodeX: tooltipX, nodeY: tooltipY });
}

function hideAgentTooltip() {
    d3.selectAll('.agent-tooltip').remove();
}

function animateEdges(edges) {
    // For dotted lines, we can animate the dash offset to create a flowing effect
    edges.each(function() {
        const edge = d3.select(this);
        const length = edge.node().getTotalLength();
        
        if (length > 0) {
            // Animate the dash pattern to create a flowing effect
            edge.attr('stroke-dasharray', '10,5')
                .attr('stroke-dashoffset', 0)
                .transition()
                .duration(3000)
                .ease(d3.easeLinear)
                .attr('stroke-dashoffset', -15)
                .on('end', function() {
                    animateEdges(d3.select(this));
                });
        }
    });
}

function handleAgentAction(agentId, action) {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;
    
    // Show feedback in assistant
    addAssistantMessage(`Executing "${action}" on ${agent.name}...`);
    
    // Show immediate feedback
    addAssistantMessage('Yeah, it\'s being done!');
    
    // Show notification
    if (typeof showNotification === 'function') {
        showNotification(`Action "${action}" executed on ${agent.name}`);
    }
    
    // Simulate action completion
    setTimeout(() => {
        addAssistantMessage(`✓ Done! "${action}" has been executed on ${agent.name}.`);
    }, 1500);
}

function addAssistantMessage(message) {
    const assistantMessages = document.getElementById('assistantMessages');
    if (!assistantMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.style.marginBottom = '10px';
    messageDiv.style.padding = '8px';
    messageDiv.style.background = 'rgba(99, 102, 241, 0.1)';
    messageDiv.style.borderRadius = '6px';
    messageDiv.style.fontSize = '11px';
    messageDiv.style.color = 'rgba(255, 255, 255, 0.7)';
    messageDiv.style.lineHeight = '1.6';
    messageDiv.textContent = message;
    
    assistantMessages.appendChild(messageDiv);
    assistantMessages.scrollTop = assistantMessages.scrollHeight;
}

