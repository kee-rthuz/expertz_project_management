

//  working code 
import React, { useState, useEffect, useRef } from 'react';
import BidApproval from '../Bid/BidApproval';
import InviteUserPopup from './AddUser/AddUserPopup';

const AdminDashboard = ({ onClose }) => {
    const [requestedBids, setRequestedBids] = useState([]);
    const [selectedBids, setSelectedBids] = useState([]); // Use an array to store selected bids
    const [isInvitePopupVisible, setInvitePopupVisible] = useState(false);
    const [isOverlayVisible, setOverlayVisible] = useState(false);
    const overlayRef = useRef(null);

    useEffect(() => {
        fetchRequestedBids();
    }, []);

    const fetchRequestedBids = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/bids/requested');
            if (!response.ok) {
                throw new Error('Failed to fetch requested bids');
            }
            const data = await response.json();
            setRequestedBids(data);
        } catch (error) {
            console.error('Error fetching requested bids:', error);
        }
    };

    const handleApproveBid = (bid) => {
        // Add the selected bid to the list of selected bids
        setSelectedBids([...selectedBids, bid]);
    };

    const handleApprove = async () => {
        // Implement approval logic here for each selected bid
        selectedBids.forEach(async (bid) => {
            console.log('Bid approved:', bid);
            try {
                const response = await fetch(`http://localhost:5000/api/delete_bids_approved/${bid._id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Remove the approved bid from the list of selected bids
                setSelectedBids(selectedBids.filter(selectedBid => selectedBid !== bid));
                // Refresh bid list
                fetchRequestedBids();
            } catch (error) {
                console.error('Error approving bid:', error);
            }
        });
    };

    const handleReject = () => {
        // Implement rejection logic here
        setSelectedBids([]); // Clear selected bids
    };

    const handleInviteUsers = () => {
        setInvitePopupVisible(true);
        setOverlayVisible(true);
    };

    const handleCloseInvitePopup = () => {
        setInvitePopupVisible(false);
        setOverlayVisible(false);
    };

    const handleOverlayClick = (event) => {
        if (event.target === overlayRef.current) {
            handleCloseInvitePopup();
        }
    };

    return (
        <div className="fixed left-[200px] w-[calc(100%-200px)] h-full bg-[#c8d8e4] p-4 overflow-y-auto">
<div className="bg-white rounded-lg p-4 mb-4 w-full card flex justify-between">
    <div></div>
    <div>
        <button className="bg-[#007bff] text-white px-4 py-2 rounded hover:bg-[#0056b3]" onClick={handleInviteUsers}>
            Invite Users
        </button>
    </div>
</div>

        </div>
    );
}

export default AdminDashboard;
