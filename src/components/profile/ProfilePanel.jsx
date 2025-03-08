import { Form, Formik } from "formik";
import FormikCustomInput from "../common/FormikCustomInput";
import { FormikCheckbox } from "../common/CustomCheckBox";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useGlobalContext } from "../../context/ContextExport";
import ImageProfile from "./ImageProfile";

const ProfilePanel = () => {
    const { getUser, userProfile, updateUserProfile, loadingEditProfile } =
        useGlobalContext();
    const [editForm, setEditForm] = useState(true);
    const [preview, setPreview] = useState(userProfile?.userImage || "");

    useEffect(() => {
        getUser();
        setPreview(userProfile?.userImage);
    }, []);

    useEffect(() => {
        setPreview(userProfile?.userImage);
    }, [userProfile]);

    const initialValues = {
        fullName: userProfile?.fullName || "",
        email: userProfile?.email || "",
        // interests: userProfile?.interests || [],
        userImage: null,
    };

    const formData = [
        {
            id: 1,
            name: "fullName",
            label: "Full Name",
            type: "text",
            value: "",
        },
        {
            id: 2,
            name: "email",
            label: "Email",
            type: "email",
            value: "",
            disabled: true,
        },
    ];

    const handleInterestChange = (e, setFieldValue, values) => {
        const interest = e.target.value;
        const isChecked = e.target.checked;

        if (isChecked) {
            setFieldValue("interests", [...values.interests, interest]);
        } else {
            setFieldValue(
                "interests",
                values.interests.filter((i) => i !== interest)
            );
        }
    };

    const handleCancelInterest = (setFieldValue) => {
        setEditForm(!editForm);
        setPreview(userProfile?.userImage);
        setFieldValue("fullName", userProfile?.fullName);
        setFieldValue("email", userProfile?.email);
        setFieldValue("interests", userProfile?.interests);
    };

    const interestsOptions = [
        { value: "Machine Learning", label: "Machine Learning" },
        { value: "Robotics", label: "Robotics" },
        {
            value: "Natural Language Processing (NLP)",
            label: "Natural Language Processing (NLP)",
        },
        { value: "Cognitive Computing", label: "Cognitive Computing" },
        { value: "AI in Gaming", label: "AI in Gaming" },
    ];

    const handleSubmitForm = (values, setFieldValue) => {
        // console.log(values);
        const successFunc = () => {
            handleCancelInterest(setFieldValue);
        };
        updateUserProfile(values, successFunc);
        // console.log(values);
    };

    return (
        <div>
            <Formik
                initialValues={initialValues}
                // onSubmit={onSubmit}
                className="flex gap-5"
                enableReinitialize
            >
                {({ values, setFieldValue }) => (
                    <>
                        <div className="text-lg flex items-center gap-[0.625rem] border-b pb-5 px-4 md:px-6 ">
                            <ImageProfile
                                userProfile={userProfile}
                                setFieldValue={setFieldValue}
                                editForm={editForm}
                                preview={preview}
                                setPreview={setPreview}
                            />
                        </div>
                        <div className="px-4 mt-5 md:px-6">
                            <div className="">
                                <div>
                                    <>
                                        <div className="flex items-center justify-between">
                                            <div className="">
                                                <h3 className=" text-[#002058] text-base font-semibold">
                                                    Personal Details
                                                </h3>
                                                <p className="text-[#685f78] text-sm">
                                                    Edit your personal
                                                    information
                                                </p>
                                            </div>

                                            <button
                                                className={`border rounded px-3 py-2 ${editForm
                                                        ? "border-[#002058] text-[#002058] "
                                                        : "border-red-500 text-red-500"
                                                    }`}
                                                onClick={() =>
                                                    handleCancelInterest(
                                                        setFieldValue
                                                    )
                                                }
                                            >
                                                {editForm ? (
                                                    <TbEdit />
                                                ) : (
                                                    <IoClose />
                                                )}
                                            </button>
                                        </div>
                                        <Form>
                                            <div className="fle x gap-5 py-4">
                                                <div
                                                    // className="w-full  "
                                                    className="grid grid-cols-1 sm:grid-cols-1 gap-4  max-w-[25rem]  w-full "
                                                >
                                                    {formData?.map((item) => {
                                                        return (
                                                            <FormikCustomInput
                                                                key={item?.id}
                                                                label={
                                                                    item?.label
                                                                }
                                                                name={
                                                                    item?.name
                                                                }
                                                                type={
                                                                    item?.type
                                                                }
                                                                disabled={
                                                                    editForm ||
                                                                    item?.disabled
                                                                }
                                                            />
                                                        );
                                                    })}
                                                </div>
                                                {/* <div className="fex mt-5">
                                                    <p
                                                        // htmlFor={name}
                                                        className="block text-sm/6 font-medium text-gray-900 mb-2"
                                                    >
                                                        Area of interest
                                                    </p>

                                                    <div className="flex flex-col md:flex-row gap-5">
                                                        {interestsOptions.map(
                                                            (option, index) => {
                                                                return (
                                                                    <FormikCheckbox
                                                                        key={
                                                                            index
                                                                        }
                                                                        disabled={
                                                                            editForm
                                                                        }
                                                                        name="interests"
                                                                        value={
                                                                            option.value
                                                                        }
                                                                        label={
                                                                            option.label
                                                                        }
                                                                        checked={values?.interests?.includes(
                                                                            option.value
                                                                        )}
                                                                        id={
                                                                            option.value
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleInterestChange(
                                                                                e,
                                                                                setFieldValue,
                                                                                values
                                                                            )
                                                                        }
                                                                    />
                                                                );
                                                            }
                                                        )}
                                                    </div>
                                                </div> */}
                                            </div>
                                            {!editForm && (
                                                <button
                                                    type="button"
                                                    disabled={
                                                        loadingEditProfile
                                                    }
                                                    onClick={() =>
                                                        handleSubmitForm(
                                                            values,
                                                            setFieldValue
                                                        )
                                                    }
                                                    className="mt-5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                >
                                                    Save Changes
                                                </button>
                                            )}
                                        </Form>
                                    </>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Formik>
        </div>
    );
};

export default ProfilePanel;
