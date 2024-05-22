import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Cropper from "react-easy-crop";
import { cropImage } from "./CropUtils.js";

function ImgCropModal(props) {
    const { modalClose, image, setCroppedImage } = props;

    const ImageCropper = ({
        open, image, onComplete, containerStyle,
        ...props
    }) => {
        const [crop, setCrop] = useState({ x: 0, y: 0 });
        const [zoom, setZoom] = useState(1);
        const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

        return (
            <div>
                <div style={containerStyle}>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={4 / 5}
                        onCropChange={setCrop}
                        onCropComplete={(_, croppedAreaPixels) => {
                            setCroppedAreaPixels(croppedAreaPixels);
                        }}
                        onZoomChange={setZoom}
                        {...props}
                    />
                </div>
                <div className='flex justify-center mt-6 text-white text-lg'>
                    <button
                        className='h-10 w-28 bg-[#61D2A2] rounded-xl mx-8'
                        onClick={() => {
                            cropImage(image, croppedAreaPixels, console.log).then(croppedImage => {
                                onComplete(croppedImage);
                            });
                        }}
                    >
                        편집
                    </button>
                    
                    <button
                        className='h-10 w-28 border-[3px] border-[#61D2A2] bg-white text-[#61D2A2] rounded-xl mx-8'
                        onClick={() => { modalClose(false);}}>
                        취소
                    </button>
                </div>
            </div>
        );
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (e.target.classList.contains("modal_overlay")) {
                modalClose(false);

            }
        };

        const handleEscapeKey = (e) => {
            if (e.key === "Escape") {
                modalClose(false);

            }
        };

        document.addEventListener("click", handleOutsideClick);
        document.addEventListener("keydown", handleEscapeKey);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [modalClose]);

    return ReactDOM.createPortal(
        <div>
            <div className='hidden md:flex'>
                <div className="modal_overlay fixed w-full h-full inset-0 bg-slate-200/[.3] flex justify-center items-center">
                    <div className="modal flex justify-start bg-white opacity-100 h-[611px] w-[1014px] mx-[3%] rounded-xl border-4 border-[#A9D6C3] drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)]">
                        <div className='modal_contents flex-1 mr-[15px] ml-[25px] my-[15px] text-[#589B7F]'>
                            <ImageCropper
                                image={image}
                                onComplete={(croppedImage) => {
                                    setCroppedImage(croppedImage);
                                    modalClose(false);
                                }}
                                containerStyle={{
                                    position: "relative",
                                    width: "99%",
                                    height: 500,
                                    background: "#333",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex md:hidden'>
                <div className="fixed w-screen h-screen top-14 bg-white text-[#589B7F]">
                    <div className="w-full h-full overflow-y-auto flex flex-col">
                        <div className='mx-[5%]'>
                            <div>
                                <ImageCropper
                                    image={image}
                                    onComplete={(croppedImage) => {
                                        setCroppedImage(croppedImage);
                                        modalClose(false);
                                    }}
                                    containerStyle={{
                                        position: "relative",
                                        width: "100%",
                                        height: "75vh",
                                        background: "#333",
                                        marginTop : 20,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal')
    );
}

export default ImgCropModal;
