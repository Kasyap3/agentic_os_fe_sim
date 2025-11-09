// Checklist Animation with Chain-of-Thought Reasoning
// This file handles the sophisticated checklist animation with reasoning steps

const checklistData = [
    {
        task: "Checking data from bank accounts",
        reasoning: [
            "Connecting to your banking services...",
            "Found 3 linked accounts: Checking, Savings, Credit",
            "Verifying payment methods... Amex ending in 4567 has sufficient limit",
            "Payment method confirmed and ready"
        ],
        dataSource: "Banking APIs"
    },
    {
        task: "Verifying passport and visa requirements",
        reasoning: [
            "Accessing your digital travel documents...",
            "Passport verified: Valid until 2026, no issues found",
            "Checking visa requirements for Switzerland...",
            "Confirmed: US citizens don't require visa for stays under 90 days"
        ],
        dataSource: "Travel Documents"
    },
    {
        task: "Checking available flights to Zurich",
        reasoning: [
            "Querying flight databases for Zurich routes...",
            "Found 12 direct flights available for your dates",
            "Filtering by your preferences: Business class, evening departure",
            "Best matches identified: Swiss Air, Lufthansa, United"
        ],
        dataSource: "Flight APIs"
    },
    {
        task: "Comparing flight prices and schedules",
        reasoning: [
            "Analyzing price trends and availability...",
            "Business class range: $2,400-$3,200 across carriers",
            "Comparing schedules: Swiss Air LH 1190 departs 7:45 PM (perfect timing)",
            "Selected: Swiss Air LH 1190 - Best value, ideal schedule, confirmed"
        ],
        dataSource: "Price Comparison Engine"
    },
    {
        task: "Checking weather forecast for Zurich",
        reasoning: [
            "Fetching 7-day weather forecast for Zurich...",
            "Weather outlook: 15-22°C, partly cloudy, light rain possible",
            "Analyzing your past packing preferences from similar trips...",
            "Recommendation: Light layers, umbrella, comfortable walking shoes"
        ],
        dataSource: "Weather Services"
    },
    {
        task: "Understanding your travel preferences",
        reasoning: [
            "Analyzing your travel history from past 12 months...",
            "Seat preference: Window seats for short flights, aisle for long flights",
            "Dietary preferences: Vegetarian options, no nuts (from your notes)",
            "Hotel preferences: 4+ stars, business center, gym access required"
        ],
        dataSource: "Travel History & Preferences"
    },
    {
        task: "Searching hotels near conference center",
        reasoning: [
            "Scanning hotel databases near Kongresshaus Zurich...",
            "Found 8 hotels within 1km walking distance",
            "Filtering by your preferences: 4+ stars, business amenities",
            "Top candidates: Hotel Schweizerhof, Baur au Lac, Savoy Baur en Ville"
        ],
        dataSource: "Hotel Booking Systems"
    },
    {
        task: "Comparing hotel amenities and prices",
        reasoning: [
            "Evaluating amenities against your requirements...",
            "Priority check: WiFi ✓, Gym ✓, Business center ✓, Restaurant ✓",
            "Comparing prices: $280-$350/night range",
            "Best match: Hotel Schweizerhof (4.5★, $280/night) - All amenities, best value"
        ],
        dataSource: "Hotel Comparison Engine"
    },
    {
        task: "Checking hotel availability for dates",
        reasoning: [
            "Checking real-time room availability for your dates...",
            "Dates confirmed: March 20-24 (4 nights)",
            "Room type available: Deluxe with city view",
            "Booking confirmed: Hotel Schweizerhof, Deluxe room, city view, 4 nights"
        ],
        dataSource: "Hotel Inventory System"
    },
    {
        task: "Verifying conference center location",
        reasoning: [
            "Mapping conference venues in Zurich...",
            "Kongresshaus Zurich located: 0.8km from selected hotel",
            "Walking distance: 10 minutes, easy commute",
            "Location verified: Perfect proximity for meetings"
        ],
        dataSource: "Maps & Location Services"
    },
    {
        task: "Checking transportation options",
        reasoning: [
            "Analyzing transport networks and routes...",
            "Airport to hotel: 15km distance, 20min drive time",
            "Hotel to conference: Walkable (0.8km, 10min walk)",
            "Transportation plan: Airport pickup + walking to conference"
        ],
        dataSource: "Transportation APIs"
    },
    {
        task: "Comparing car service providers",
        reasoning: [
            "Evaluating car service providers and ratings...",
            "Top-rated options: Blacklane (4.9★), Uber Lux (4.8★)",
            "Comparing: Reliability, punctuality, vehicle quality",
            "Selected: Private car service - Most reliable, confirmed booking"
        ],
        dataSource: "Transportation Services"
    },
    {
        task: "Verifying meeting times and locations",
        reasoning: [
            "Cross-referencing your calendar and meeting data...",
            "Credit Suisse meeting: 9:00 AM, Paradeplatz 8, Zurich",
            "UBS meeting: 2:00 PM, Bahnhofstrasse 45, Zurich",
            "Workshop session: 10:00 AM, Innovation Lab (confirmed)"
        ],
        dataSource: "Calendar & Meeting Data"
    },
    {
        task: "Checking time zone differences",
        reasoning: [
            "Calculating time zone differences...",
            "Zurich timezone: UTC+1 (Central European Time)",
            "Your timezone: UTC-5 (Eastern Standard Time)",
            "6-hour difference accounted for in all schedules"
        ],
        dataSource: "Time Zone Services"
    },
    {
        task: "Reviewing dietary preferences",
        reasoning: [
            "Checking your food preferences from notes and history...",
            "Dietary requirements: Vegetarian options, no nuts (allergy noted)",
            "Reviewing restaurant menus for vegetarian options...",
            "Restaurant recommendations updated: Kronenhalle (vegetarian menu available)"
        ],
        dataSource: "Personal Notes & Preferences"
    },
    {
        task: "Checking travel insurance options",
        reasoning: [
            "Reviewing your current insurance policies...",
            "Current policy: Covers international travel, medical emergencies",
            "Checking coverage for Switzerland: Fully covered",
            "No additional insurance needed - Current policy sufficient"
        ],
        dataSource: "Insurance Providers"
    },
    {
        task: "Verifying payment methods",
        reasoning: [
            "Checking payment options and card details...",
            "Primary payment: Amex ending in 4567 (preferred card)",
            "Backup payment: Visa ending in 8901 (verified)",
            "Payment methods confirmed: Both cards active and ready"
        ],
        dataSource: "Payment Systems"
    },
    {
        task: "Confirming booking policies",
        reasoning: [
            "Reviewing cancellation and refund policies...",
            "Flights: 24-hour free cancellation policy applies",
            "Hotel: Free cancellation until 48 hours before check-in",
            "All policies reviewed: Flexible cancellation options available"
        ],
        dataSource: "Booking Policies"
    },
    {
        task: "Preparing itinerary details",
        reasoning: [
            "Compiling all booking information and confirmations...",
            "Creating detailed day-by-day schedule with all activities",
            "Adding flight confirmations, hotel booking, meeting details...",
            "Itinerary complete: All details organized and ready"
        ],
        dataSource: "Itinerary Generator"
    },
    {
        task: "Finalizing all arrangements",
        reasoning: [
            "Double-checking all bookings and confirmations...",
            "All confirmations received: Flights ✓, Hotel ✓, Transportation ✓",
            "Calendar updated with full itinerary and all events",
            "Final verification complete: Everything ready for your trip"
        ],
        dataSource: "Final Verification System"
    }
];

// Make function globally accessible
window.showChecklistWithReasoning = function() {
    const messages = document.getElementById('aiMessages');
    const checklistDiv = document.createElement('div');
    checklistDiv.className = 'ai-message';
    checklistDiv.id = 'bookingChecklist';
    
    let checklistHTML = `
        <div class="ai-avatar">🤖</div>
        <div class="ai-bubble">
            <div class="ai-checklist" id="checklistContainer">
    `;
    
    // Initially hide all items
    checklistData.forEach((item, index) => {
        checklistHTML += `
            <div class="checklist-item-wrapper" id="checklist-wrapper-${index}" style="display: none;">
                <div class="checklist-reasoning" id="checklist-reasoning-${index}"></div>
                <div class="ai-checklist-item" id="checklist-item-${index}">
                    <span class="checklist-task">${item.task}</span>
                    <span class="checklist-source">${item.dataSource}</span>
                </div>
            </div>
        `;
    });
    
    checklistHTML += `
            </div>
        </div>
    `;
    
    checklistDiv.innerHTML = checklistHTML;
    messages.appendChild(checklistDiv);
    messages.scrollTop = messages.scrollHeight;
    
    // Animate items one by one with reasoning
    let currentIndex = 0;
    let totalDelay = 0;
    
    function showNextItem(index) {
        if (index >= checklistData.length) {
            // All items shown, now complete them
            setTimeout(() => {
                completeAllItems();
            }, 500);
            return;
        }
        
        const item = checklistData[index];
        const wrapper = document.getElementById(`checklist-wrapper-${index}`);
        const reasoningDiv = document.getElementById(`checklist-reasoning-${index}`);
        const itemElement = document.getElementById(`checklist-item-${index}`);
        
        // Show wrapper with slide-down animation
        wrapper.style.display = 'block';
        wrapper.classList.add('show');
        
        // Show reasoning steps one by one
        let reasoningIndex = 0;
        const showReasoningStep = () => {
            if (reasoningIndex < item.reasoning.length) {
                const step = item.reasoning[reasoningIndex];
                const stepDiv = document.createElement('div');
                stepDiv.className = 'reasoning-step';
                stepDiv.textContent = step;
                reasoningDiv.appendChild(stepDiv);
                reasoningDiv.scrollTop = reasoningDiv.scrollHeight;
                messages.scrollTop = messages.scrollHeight;
                
                reasoningIndex++;
                setTimeout(showReasoningStep, 400 + Math.random() * 200);
            } else {
                // Reasoning complete, show the task
                setTimeout(() => {
                    itemElement.classList.add('show');
                    messages.scrollTop = messages.scrollHeight;
                    
                    // Wait a bit, then show next item
                    setTimeout(() => {
                        showNextItem(index + 1);
                    }, 600);
                }, 300);
            }
        };
        
        // Start showing reasoning after a brief delay
        setTimeout(showReasoningStep, 200);
    }
    
    function completeAllItems() {
        checklistData.forEach((item, index) => {
            setTimeout(() => {
                const itemElement = document.getElementById(`checklist-item-${index}`);
                if (itemElement) {
                    itemElement.classList.add('completed');
                    messages.scrollTop = messages.scrollHeight;
                }
            }, index * 150);
        });
        
        // After all items are completed, update calendar
        setTimeout(() => {
            if (typeof updateCalendarSilently === 'function') {
                updateCalendarSilently();
            }
            setTimeout(() => {
                if (typeof addAIMessage === 'function') {
                    showBookingSummary();
                }
            }, 1000);
        }, checklistData.length * 150 + 500);
    }
    
    // Start the animation
    setTimeout(() => {
        showNextItem(0);
    }, 500);
}

// Show detailed booking summary
window.showBookingSummary = function() {
    const messages = document.getElementById('aiMessages');
    
    // Calculate dates
    const today = new Date();
    const daysUntilWednesday = (3 - today.getDay() + 7) % 7 || 7;
    const flightOutDate = new Date(today);
    flightOutDate.setDate(today.getDate() + daysUntilWednesday);
    
    const meetingDate = new Date(flightOutDate);
    meetingDate.setDate(flightOutDate.getDate() + 1);
    
    const workshopDate = new Date(meetingDate);
    workshopDate.setDate(meetingDate.getDate() + 1);
    
    const dinnerDate = new Date(workshopDate);
    dinnerDate.setDate(workshopDate.getDate() + 1);
    
    const returnDate = new Date(dinnerDate);
    returnDate.setDate(dinnerDate.getDate() + 1);
    
    // Format dates
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };
    
    const summaryHTML = `
        <div class="ai-avatar">🤖</div>
        <div class="ai-bubble">
            <div style="margin-bottom: 15px;">
                <strong style="font-size: 14px; color: #10b981;">✅ All Bookings Confirmed!</strong>
            </div>
            
            <div style="margin-bottom: 20px; padding: 12px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border-left: 3px solid rgba(99, 102, 241, 0.5);">
                <strong style="display: block; margin-bottom: 8px; color: rgba(255, 255, 255, 0.9);">✈️ Flights</strong>
                <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7); line-height: 1.6;">
                    <div><strong>Outbound:</strong> Swiss Air LH 1190</div>
                    <div>${formatDate(flightOutDate)} at 7:45 PM</div>
                    <div>Business Class • Terminal 2</div>
                    <div style="margin-top: 8px;"><strong>Return:</strong> Swiss Air LH 1191</div>
                    <div>${formatDate(returnDate)} at 3:00 PM</div>
                    <div>Business Class</div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px; padding: 12px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border-left: 3px solid rgba(99, 102, 241, 0.5);">
                <strong style="display: block; margin-bottom: 8px; color: rgba(255, 255, 255, 0.9);">🏨 Hotel</strong>
                <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7); line-height: 1.6;">
                    <div><strong>Hotel Schweizerhof</strong> (4.5★)</div>
                    <div>Deluxe Room with City View</div>
                    <div>Check-in: ${formatDate(flightOutDate)}</div>
                    <div>Check-out: ${formatDate(returnDate)}</div>
                    <div>4 nights • $280/night</div>
                    <div style="margin-top: 6px; font-size: 11px; color: rgba(255, 255, 255, 0.6);">✓ WiFi, Gym, Business Center, Restaurant</div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px; padding: 12px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border-left: 3px solid rgba(99, 102, 241, 0.5);">
                <strong style="display: block; margin-bottom: 8px; color: rgba(255, 255, 255, 0.9);">🚗 Transportation</strong>
                <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7); line-height: 1.6;">
                    <div><strong>Airport Pickup:</strong> ${formatDate(flightOutDate)} at 11:30 AM (Zurich time)</div>
                    <div>Private car service • Hotel transfer</div>
                    <div style="margin-top: 8px;"><strong>Airport Dropoff:</strong> ${formatDate(returnDate)} at 12:00 PM</div>
                    <div>Private car service • Hotel to airport</div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px; padding: 12px; background: rgba(99, 102, 241, 0.1); border-radius: 8px; border-left: 3px solid rgba(99, 102, 255, 0.5);">
                <strong style="display: block; margin-bottom: 8px; color: rgba(255, 255, 255, 0.9);">📅 Itinerary</strong>
                <div style="font-size: 12px; color: rgba(255, 255, 255, 0.7); line-height: 1.8;">
                    <div style="margin-bottom: 10px;">
                        <strong>${formatDate(meetingDate)}</strong>
                        <div style="margin-left: 10px; margin-top: 4px;">
                            <div>🏦 9:00 AM - Credit Suisse Meeting</div>
                            <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">Paradeplatz 8, Zurich • Quarterly Review</div>
                            <div style="margin-top: 6px;">🏦 2:00 PM - UBS Meeting</div>
                            <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">Bahnhofstrasse 45, Zurich • Partnership Discussion</div>
                        </div>
                    </div>
                    <div style="margin-bottom: 10px;">
                        <strong>${formatDate(workshopDate)}</strong>
                        <div style="margin-left: 10px; margin-top: 4px;">
                            <div>📊 10:00 AM - Workshop Session</div>
                            <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">Innovation Lab • Product Roadmap Planning</div>
                        </div>
                    </div>
                    <div>
                        <strong>${formatDate(dinnerDate)}</strong>
                        <div style="margin-left: 10px; margin-top: 4px;">
                            <div>🍽️ 7:30 PM - Anniversary Dinner</div>
                            <div style="font-size: 11px; color: rgba(255, 255, 255, 0.6);">Kronenhalle Restaurant • Reservation for 2 • Vegetarian menu</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style="padding: 12px; background: rgba(16, 185, 129, 0.1); border-radius: 8px; border-left: 3px solid #10b981;">
                <div style="font-size: 12px; color: rgba(255, 255, 255, 0.8); line-height: 1.6;">
                    <div style="margin-bottom: 8px;"><strong>📍 Location Details:</strong></div>
                    <div style="font-size: 11px; color: rgba(255, 255, 255, 0.7);">
                        <div>• Hotel: 0.8km from Kongresshaus Zurich (10 min walk)</div>
                        <div>• Conference center: Walking distance from hotel</div>
                        <div>• All meetings within 1km radius</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 15px; padding: 10px; background: rgba(255, 255, 255, 0.05); border-radius: 6px; font-size: 11px; color: rgba(255, 255, 255, 0.7);">
                <div><strong>Payment:</strong> Amex ending in 4567</div>
                <div style="margin-top: 4px;"><strong>Total:</strong> $2,800 (Flights) + $1,120 (Hotel) + $180 (Transportation) = $4,100</div>
                <div style="margin-top: 6px; color: rgba(16, 185, 129, 0.8);">✓ All bookings confirmed and calendar updated</div>
            </div>
        </div>
    `;
    
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'ai-message';
    summaryDiv.innerHTML = summaryHTML;
    messages.appendChild(summaryDiv);
    messages.scrollTop = messages.scrollHeight;
}

