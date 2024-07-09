import { DAO, member, task } from '@/app/type'
import { getAvater } from '@/services/serverless/common';
import { daoMember, daoTask } from '@/services/serverless/dao';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { ManageTask } from './ManageTask';
import { ManageMember } from './ManageMember';
import { Dialog } from '@headlessui/react';

const mockAllowlist = [
    '0x1234...abcd',
    '0x5678...efgh',
    '0x9abc...ijkl'
];

export function DapManage(props: {dao: DAO}) {
    
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tasks, setTasks] = useState<task[]>([])
    const [members, setmembers] = useState<member[]>([])
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [scanning, setScanning] = useState<boolean>(false)
    const [log, setLog] = useState<string[]>([])
    const [transactionLog, setTransactionLog] = useState<string[]>([])

    useEffect(() => {
        setIsLoading(true)
        initial()
      }, [props.dao])
    
      useEffect(() => {
      }, [tasks])
    
      async function initial() {
        if(props.dao.dao_id != "") {
            const t = await daoTask(props.dao.dao_id)
            setTasks(t)
        }
        const r = await daoMember(props.dao.dao_id)
        setmembers(r)
        setIsLoading(false)
      }

      async function handleScan() {
        setScanning(true)
        setLog([])
        setTransactionLog([])
        for (let publicKey of mockAllowlist) {
            let hashResult = await detectPublicKey(publicKey);
            let address = await fulfillWithAddress(hashResult);
            setLog(prevLog => [...prevLog, `Detected publicKey: ${publicKey} ... Hash Result: ${hashResult} ... Fulfilled with address: ${address}`]);
        }
        setScanning(false)
      }

      async function handleSend() {
        setLog([]);
        for (let logEntry of log) {
            const address = logEntry.split('Fulfilled with address: ')[1];
            let txResult = await sendPOAP(address as string);
            setTransactionLog(prevLog => [...prevLog, `Sent to address: ${address} ... Tx: ${txResult} ... Send successfully`]);
        }
        setTransactionLog(prevLog => [...prevLog, `All transactions are completed`]);
      }

      async function detectPublicKey(publicKey: string): Promise<string> {
        return new Promise(resolve => setTimeout(() => resolve(`hash: ${publicKey.slice(-4)}`), 1000));
      }

      async function fulfillWithAddress(hash: string): Promise<string> {
        return new Promise(resolve => setTimeout(() => resolve(`address: ${hash.slice(-4)}`), 1000));
      }

      async function sendPOAP(address: string): Promise<string> {
        return new Promise(resolve => setTimeout(() => resolve(`tx: ${address.slice(-4)}`), 1000));
      }

    return (
            <div className="flex rounded-b-lg p-2 lg:p-8 w-full justify-center lg:justify-start glass2">
                <div className="lg:flex">
                    <div className='overflow-hidden'>
                        {tasks.length > 0 && <div className='lg:text-3xl font-medium text-cBlue'>Task Management</div>}
                        {tasks.length > 0 && <ManageTask tasks={tasks}/>}
                        {members.length > 0 && <div className='lg:text-3xl font-medium text-cBlue'>Member Management</div>}
                        {members.length > 0 && <ManageMember members={members}/>}
                        <div className='lg:text-3xl font-medium text-cBlue'>Airdrop Scanner</div>
                        <button className='w-full mt-4 h-12 bg-cBlue text-white rounded-lg' onClick={() => setIsDialogOpen(true)}>Scan</button>
                        <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
                          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded-lg w-96">
                              <Dialog.Title className="text-lg font-medium">Scanning</Dialog.Title>
                              <Dialog.Description className="mt-2">
                                {scanning ? 'Scanning and detecting public keys...' : 'Send POAP to the specific people.'}
                              </Dialog.Description>
                              <div className="mt-4">
                                <ul className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                                  {log.map((entry, index) => (
                                    <li key={index} className="text-sm text-gray-700">{entry}</li>
                                  ))}
                                  {transactionLog.map((entry, index) => (
                                    <li key={index} className="text-sm text-gray-700">{entry}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="mt-4 flex justify-end">
                                {!scanning && (
                                  <>
                                    <button className="mr-2 bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded" onClick={() => setIsDialogOpen(false)}>
                                      Cancel
                                    </button>
                                    <button className="bg-cBlue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={log.length > 0 ? handleSend : handleScan}>
                                      {log.length > 0 ? "Send" : "Scan"}
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </Dialog>
                    </div>
                </div>
            </div>
    )
}
