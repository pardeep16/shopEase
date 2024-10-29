import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeAddress, selectUserInfo } from "../../store/features/user";
import AddAddress from "./AddAddress";
import { setLoading } from "../../store/features/common";
import { deleteAddressAPI } from "../../api/userInfo";

const Profile = () => {
  const userInfo = useSelector(selectUserInfo);
  const [addAddress, setAddAddress] = useState(false);
  const dispatch = useDispatch();

  const onDeleteAddress = useCallback((id)=>{
      dispatch(setLoading(true));
      deleteAddressAPI(id).then(res=>{
        dispatch(removeAddress(id));
      }).catch(err=>{

      }).finally(()=>{
        dispatch(setLoading(false));
      })
  },[dispatch]);

  return (
    <div>
      <h1 className="text-2xl">My Info</h1>
      {!addAddress && (
        <div>
          <div className="flex gap-2">
            <h2 className="text-xl pt-4">Contact Details</h2>
            <button className="underline text-blue-900 mt-4">Edit</button>
          </div>
          <div className="pt-4">
            <p className="text-gray-700 py-2 font-bold">Full Name</p>
            <p>
              {userInfo?.firstName} {userInfo?.lastName}
            </p>
            <p className="text-gray-700 py-2 font-bold">Phone Number</p>
            <p>{userInfo?.phoneNumber ?? "None"}</p>
            <p className="text-gray-700 py-2 font-bold">Email</p>
            <p>{userInfo?.email}</p>
          </div>
          {/* Addresses */}
          <div className="pt-4">
            <div className="flex gap-12">
              <h3 className="text-lg font-bold">Address</h3>
              <button className="underline text-blue-900" onClick={()=> setAddAddress(true)}>Add New</button>
            </div>

            <div className="pt-4 grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-8 pb-10 mb-8">
              {userInfo?.addressList?.map((address, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-200 border rounded-lg p-4"
                  >
                    <p className="py-2 font-bold">{address?.name}</p>
                    <p className="pb-2">{address?.phoneNumber}</p>
                    <p className="pb-2">
                      {address?.street},{address?.city},{address?.state}
                    </p>
                    <p>{address?.zipCode}</p>
                    <div className="flex gap-2">
                      <button className="underline text-blue-900">Edit</button>
                      <button onClick={()=> onDeleteAddress(address?.id)} className="underline text-blue-900">
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {addAddress && <AddAddress onCancel={()=> setAddAddress(false)}/>}
    </div>
  );
};

export default Profile;
