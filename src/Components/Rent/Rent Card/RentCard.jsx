import PropTypes from 'prop-types';
const RentCard = ({ user }) => {

    const formatTime = (time) => {
        const formattedTime = new Date(`2022-01-01T${time}`);
        return formattedTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    return (
        <div>
            <div>
                <div className="card bg-base-100 shadow-xl">
                    <figure><img className='h-56 w-full' src={user.data.imageUrl} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{user.data.title}</h2>
                        <div className='flex h-5 w-full gap-2 items-start' >
                            <img className='h-full w-5 rounded-full' src={user.data.profilePic} alt="" />
                            Posted By: {user.data.userName}
                        </div>
                        <div className="card-actions justify-end">
                            <div>
                                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                                <button className="btn font-bold bg-[#787A91] text-white hover:text-[#787A91]" onClick={() => document.getElementById(`${user.data.imageUrl}`).showModal()}>View Details</button>
                                <dialog id={`${user.data.imageUrl}`} className="modal">
                                    <div className="modal-box">
                                        <img className='rounded-lg' src={user.data.imageUrl} alt="" />
                                        <h3 className="font-bold text-lg">{user.data.title}!</h3>
                                        <p className="py-4">Model: {user.data.model} </p>
                                        <p className="py-4">Price: ${user.data.price} Per Hour</p>
                                        <p className="py-4">Milage: {user.data.milage} km/L</p>
                                        <p className="py-4">Seating Capacity: {user.data.seat} Person</p>
                                        <p className="py-4">Available: {formatTime(user.data.from)} - {formatTime(user.data.to)}</p>
                                    </div>
                                    <form method="dialog" className="modal-backdrop">
                                        <button>close</button>
                                    </form>
                                </dialog>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

RentCard.propTypes = {
    user: PropTypes.object
}
export default RentCard;