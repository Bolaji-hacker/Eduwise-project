import ProfilePanel from "../../components/profile/ProfilePanel";

const Profile = () => {
    return (
        <div className="border border-[#e9ecef] bg-white rounded-[0.625rem]">
            <div className="py-5 px-[1.1875rem] border-[#e9ecef] border-b">
                <h3 className=" text-[#002058] text-lg font-semibold">
                    My Profile
                </h3>
            </div>
            <div className=" py-6 min-h-[60vh]">
                <ProfilePanel />
            </div>
        </div>
    );
};

export default Profile;
