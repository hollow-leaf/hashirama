import { create } from "zustand";
import { UserInfo } from "@/type";
import { saltByUserIdToken } from "@/services/serverless/user";
import { jwtDecode } from "jwt-decode";

interface UserState {
  rpcUrl: string;
  setRpcUrl: (newUrl: string) => void;
}

interface LoginState {
  userInfo: UserInfo;
  ethUserInfo: { jwt: string; salt: string };
  loginByJwt: (jwt: string) => void;
  logout: () => void;
}

const useCoreUserStore = create<UserState>()((set) => ({
  rpcUrl: "https://rpc.slock.it/goerli",
  setRpcUrl: (newUrl) => set({ rpcUrl: newUrl }),
}));

const useCoreLoginStore = create<LoginState>()((set) => ({
  userInfo: { user_name: "", avater: "", user_email: "", address: "", user_id: "" },
  ethUserInfo: { jwt: "", salt: "" },
  loginByJwt: async (jwt) => {
    const decodedJwt = jwtDecode(jwt);
    if (typeof decodedJwt.sub != undefined) {
      const _userInfo = await saltByUserIdToken(decodedJwt.sub as string);
      sessionStorage.setItem("girudo-jwt", jwt);
      sessionStorage.setItem("girudo-salt", _userInfo.salt);
      set({
        userInfo: _userInfo.userInfo,
        ethUserInfo: { jwt: jwt, salt: _userInfo.salt },
      });
    }
  },
  logout: () => {
    set({
      userInfo: { user_name: "", avater: "", user_email: "", address: "", user_id: "" },
      ethUserInfo: { jwt: "", salt: "" },
    })
  }
}));

export const useUserStore = () => {
  const store = useCoreUserStore();
  return { ...store };
};

export const useLoginStore = () => {
  const store = useCoreLoginStore();
  return { ...store };
};
