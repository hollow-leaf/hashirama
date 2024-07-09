import { getAvater } from '@/services/serverless/common';
import { useLoginStore } from '@/stores/useUserStore';
import { jwtDecode } from 'jwt-decode';
import Image from 'next/image'
import { useEffect, useState } from 'react';


export function Profile() {
    const {ethUserInfo, userInfo, loginByJwt} = useLoginStore();
    const [preview, setPreview] = useState<string>("");

    useEffect(() => {
        setPreview("/task0.png")
    }, [ethUserInfo])

    return (
        <div className="w-full lg:w-64 lg:h-[700px] my-6 lg:mx-6 lg:my-0 rounded-lg glass">
            <div className="flex justify-center px-4 py-8">
                <div className="space-y-6 text-black">
                    <Image
                    src={preview == "" ? "/task0.png" : preview}
                    width={180}
                    height={180}
                    alt="Picture of the author"
                    className='rounded-full border-cBlue border-4 w-[100px] h-[100px] lg:w-[180px] lg:h-[180px]'
                    />
                    <div>
                        <div className="text-center md:text-2xl">{userInfo.user_name == "" ? "Brother Jake" : userInfo.user_name}</div>
                        <div className="text-center text-black/60 text-xs md:text-sm">Joined June 2024</div>
                    </div>
                </div>
            </div>
        </div>
    )
}