import { TOKEN_KEY_LOCAL_STORAGE } from "../Config/config_keys";

interface HTTP_Error_Response {
  ErrorCode?: string;
  ErrorMessage?: string;
}
export enum HTTP_RESPONSE_TYPE {
  SUCCESS,
  ERROR,
}
export interface HttpResponse<T> {
  Response?: T;
  ResStatus?: HTTP_RESPONSE_TYPE;
  ErrorMessage?: string;
}

const baseUrl = window.globalConfig.apiUrl;

export const QuantomGET = async <T>(
  url: string,
  isUseToke?: boolean
): Promise<HttpResponse<T>> => {
  try {
    //const baseUrl= "https://localhost:44342/api/";

    //this._token= await this.getToken();
    // console.log(this._token);
    let fullUrl = baseUrl + url;
    let token = await getToken();

    console.log(fullUrl);
    let res = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        // 'Accept': 'application/json',
        // 'Content-type': 'application/text',
      },
    });
    // console.log('response of location is ');
    // console.log(res);
    if (res.ok) {
      // console.log('response is ok');
      console.log(res);
      let data = await res.json();
      //let data= res as any;
      // console.log('show data')
      // console.log(data);
      // return data;
      let retObj: HttpResponse<T> = {};
      retObj.Response = data;
      retObj.ResStatus = HTTP_RESPONSE_TYPE.SUCCESS;
      return retObj;
    } else {
      let errorRes: any;
      // alert(1);
      const contentType = res.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        errorRes = await res.json();
      } else {
        errorRes = await res.text(); // Handle non-JSON response
      }
      // let errorRes: any = await res?.json();
      // alert(2);
      // console.log("error response is", await res?.json());

      console.log("1 completed");
      console.warn("error response is", errorRes);
      let retObj: any = {};
      console.log("2 completed");

      retObj.ResStatus = HTTP_RESPONSE_TYPE.ERROR;
      console.log("3 completed");

      // retObj.Response = errorRes;
      retObj.ErrorMessage = errorRes;
      console.log("4 completed");

      console.log("return response is", retObj);
      return retObj;
    }
  } catch (e1: any) {
    console.log("error message is ", e1);
    return {
      ResStatus: HTTP_RESPONSE_TYPE.ERROR,
      ErrorMessage: "Something invalid happen",
    };
    // store.dispatch(StopLoading());
    // store.dispatch(SetErrorMessage({willShowError:true,errorMessage:"Transaction Fail , Something Invalid Happen",errorHeader:"Error",}))

    // let e: Error = e1;
    // // console.log('Error Is');
    // // console.log(e);
    // alert(e.message);
    // // Loader(false);
    throw e1;
  }
};

export const QuantomPOST = async <T>(
  url: string,
  isUseToken?: boolean,
  data?: any,
  loadingStatus?: "NONE" | "LOADING" | "PROGRESS_BAR"
): Promise<HttpResponse<T>> => {
  try {
    // const baseUrl= "https://localhost:44342/api/";

    //this._token= await this.getToken();
    // console.log(this._token);
    let fullUrl = baseUrl + url;
    let token = await getToken();

    console.log("data inside post method is", data);

    let res = await fetch(fullUrl, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: "Bearer " + token, // Uncomment if needed
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    if (res.status === 200 || res.status === 201) {
      console.warn("server response is ok ", res);
      let result = await res.json();

      let retObj: HttpResponse<T> = {};
      retObj.Response = result;
      retObj.ResStatus = HTTP_RESPONSE_TYPE.SUCCESS;
      // store.dispatch(StopLoading());

      //  setStopLoading();
      return retObj;
    } else {
      // alert('error')
      let errorRes: any = await res.json();
      console.warn("error response is", errorRes);
      let retObj: HttpResponse<T> = {};
      retObj.ResStatus = HTTP_RESPONSE_TYPE.ERROR;
      retObj.Response = errorRes;
      retObj.ErrorMessage = errorRes;
      return retObj;
    }
  } catch (e: any) {
    let e1: Error = e;

    //  setStopLoading();
    // state?.setShowErrorMessage(errorRes?.ErrorMessage,"Error","Errro");
    return {
      ResStatus: HTTP_RESPONSE_TYPE.ERROR,
      Response: undefined,
    };
  }
};

const getToken = async (): Promise<string> => {
  let res = (await window.localStorage.getItem(TOKEN_KEY_LOCAL_STORAGE)) ?? "";
  return Promise.resolve(res);
};
