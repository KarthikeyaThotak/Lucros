import React, { useEffect } from 'react';

function Webull() {
  useEffect(() => {
    // Show the modal on page load
    const modal = document.getElementById('my_modal_1');
    if (modal) {
      modal.showModal();
    }
  }, []);
  const purchase = (Math.random() * 10).toFixed(2);
  const roundedNumber = Math.ceil(purchase);
  const invest = (roundedNumber - parseFloat(purchase)).toFixed(2);

  return (
    <div>
      {/* Open the modal manually (just for testing or other actions) */}
      <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}>
        Today's Investment
      </button>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Latest Purchase was {purchase}, so we are investing {invest}</p>
          <div className="modal-action">
            <form method="dialog">
              {/* Close button will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Webull;
