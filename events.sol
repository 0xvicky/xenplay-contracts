// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Main contract
contract EventOutcome {
    // Struct representing an event
    struct Event {
        address creator;
        string title;
        string[] outcomes;
        bool isActive;
        string outcome;
    }

    // Mapping to store events
    mapping(uint256 => Event) public events;
    uint256 public eventCount;
    address public admin;

    // Events for logging
    event EventCreated(
        uint256 indexed eventId,
        string title,
        string[] outcomes,
        bool isActive
    );
    event EventUpdated(uint256 indexed eventId, bool isActive);
    event EventClosed(uint256 indexed eventId, string outcome);

    // Error definitions
    error EmptyTitle();
    error EmptyOutcomes();
    error EventInactive();
    error InvalidOutcome();
    error NotAdmin();

    constructor(address admn) {
        admin = admn;
    }

    // Function to create a new event
    function createEvent(
        string memory title,
        string[] memory outcomes
    ) external {
        if (msg.sender != admin) revert NotAdmin();
        if (bytes(title).length == 0) revert EmptyTitle();
        if (outcomes.length == 0) revert EmptyOutcomes();

        events[eventCount] = Event({
            creator: msg.sender,
            title: title,
            outcomes: outcomes,
            isActive: true,
            outcome: ""
        });

        emit EventCreated(eventCount, title, outcomes, true);
        eventCount++;
    }

    // Function to update an existing event's isActive flag
    function updateEvent(uint256 eventId, bool isActive) external {
        Event storage eventToUpdate = events[eventId];
        if (eventToUpdate.creator != admin) revert NotAdmin();
        eventToUpdate.isActive = isActive;

        emit EventUpdated(eventId, isActive);
    }

    // Function to close an event and determine the outcome
    function closeEvent(uint256 eventId, string memory outcome) external {
        Event storage eventToClose = events[eventId];
        if (eventToClose.creator != admin) revert NotAdmin();
        if (!eventToClose.isActive) revert EventInactive();

        bool isValidOutcome = false;
        for (uint256 i = 0; i < eventToClose.outcomes.length; i++) {
            if (
                keccak256(bytes(eventToClose.outcomes[i])) ==
                keccak256(bytes(outcome))
            ) {
                //we used keccak used due to potential encoding issues and gas costs.
                isValidOutcome = true;
                break;
            }
        }
        if (!isValidOutcome) revert InvalidOutcome();

        eventToClose.isActive = false;
        eventToClose.outcome = outcome;

        emit EventClosed(eventId, outcome);
    }
}

//doubts
/*
1. will event be activated right away its creation?
2. Event id format

*/

//Possible Optimizations
/**
 1. We can store every possible string value in form of bytes32, so make all operations cheaper and more efficient
 */
