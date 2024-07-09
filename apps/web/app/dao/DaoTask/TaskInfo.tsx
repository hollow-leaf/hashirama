import { useState } from "react";
import { ModalL } from "../../../components/Modal/ModalL";
import Image from "next/image";
import { DAO, task } from "@/app/type";
import { useAccount } from "wagmi";

export function TaskInfo(props: {
  showBow: any;
  close: any;
  dao: DAO;
  task: task;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [hashValue, setHashValue] = useState<string>("");
  const { address } = useAccount();
  const [macAddress, setMacAddress] = useState<string>("");

  async function registerHandler(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
    if (address) {
      // Simulate an API call and generate a hash value
      setTimeout(() => {
        const hash = Math.random().toString(16).slice(2);
        setHashValue(hash);
        setIsLoading(false);
        setIsSuccess(true);
        alert("Register successful!");
      }, 3000);
    } else {
      setIsLoading(false);
      return;
    }
  }

  return (
    <ModalL isLoading={isLoading} showBox={props.showBow} closed={props.close}>
      <div className="lg:flex lg:w-[800px] pb-8 px-3 lg:px-8">
        <div className="flex justify-center w-full lg:w-[350px]">
          <Image
            className="my-1 mx-4 glass shadow rounded-2xl h-[300px] w-[300px]"
            src="/girudo.png"
            width={300}
            height={300}
            alt="Picture of the author"
          />
        </div>
        <div className="flex flex-col justify-font w-full lg:w-[450px] px-4">
          <div className="mt-4 mb-4">{props.task.task_description}</div>
          <form onSubmit={registerHandler} className="flex flex-col space-y-4">
            <div>
              <label
                htmlFor="macAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Public Address
              </label>
              <input
                type="text"
                id="macAddress"
                value={macAddress}
                onChange={(e) => setMacAddress(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cBlue focus:border-cBlue sm:text-sm"
                placeholder="Enter your MAC address"
                required
              />
            </div>
            {isSuccess && (
            <div className="mt-4 text-gray-500">
              Hash Value: {hashValue}
            </div>
          )}
            <button
              type="submit"
              className="bg-cBlue p-3 text-white rounded-md self-end"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </ModalL>
  );
}
