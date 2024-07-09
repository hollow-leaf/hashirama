import React, { useState } from 'react';
import Image from 'next/image'
import { task } from '@/app/type';

export function AwesomeTask(props: {task: task}) {
    
    return (
        <div className="my-4 w-[300px] lg:w-[500px] glass cursor-pointer max-w-xl border-1 border-cBlue justify-between space-x-5 text-black p-2 lg:p-4 m-2 lg:m-4 flex rounded-md">
            <div className='w-[160px] lg:w-[300] flex flex-col justify-between'>
                <div className="lg:text-2xl font-medium">{props.task.task_name}</div>
                <div className=''>
                    <div className="flex items-center">
                        <Image
                        className='p-1 mr-1'
                        src="/party.svg"
                        width={24}
                        height={24}
                        alt="Picture of the author"
                        />
                        <div className="text-sm lg:text-lg">{props.task.dao_name}</div>
                    </div>
                    <div className="flex items-center">
                        <Image
                        className='p-1 mr-1'
                        src="/medal.svg"
                        width={24}
                        height={24}
                        alt="Picture of the author"
                        />
                        <div className="text-sm lg:text-lg">{props.task.task_prize}</div>
                    </div>
                </div>
            </div>
            <div>
                <Image
                src="/task0.png"
                width={180}
                height={180}
                alt="Picture of the author"
                />
            </div>
        </div>
    )
}