import * as qiniu from "qiniu-js";
import api from "./api";
import { guid, getFileTypeByName } from "./util";
const DOMAIN = import.meta.env.VITE_QINIU_CDN;

//将base64转换为文件
export function dataURLtoFile(dataurl: string, filename: string) {
  let arr = dataurl.split(",");
  let match = arr[0].match(/:(.*?);/);
  let mime = match ? match[1] : null;
  if (!mime) return null;
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export function dataURItoBlob(dataURI: string) {
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0]; // mime类型
  var byteString = atob(dataURI.split(",")[1]); //base64 解码
  var arrayBuffer = new ArrayBuffer(byteString.length); //创建缓冲数组
  var intArray = new Uint8Array(arrayBuffer); //创建视图

  for (var i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([intArray], { type: mimeString });
}

export const uploadImg = (
  uptoken: string,
  file: File,
  accept = "image/*",
  overwrite = false,
  allType?: boolean,
  nodeKey?: string,
  updatePercent?: (percent: string, imageUrl?: string) => void
) => {
  const putExtra = allType
    ? {
        // 文件原文件名
        fname: "",
        // 自定义变量
        params: {},
      }
    : {
        // 文件原文件名
        fname: "",
        // 自定义变量
        params: {},
        // 限制上传文件类型
        mimeType: accept,
      };

  const qiniuConfig = {
    useCdnDomain: true,
    disableStatisticsReport: false,
    retryCount: 5,
    region: qiniu.region.z0,
    // https://blog.csdn.net/Wuyo_7/article/details/112478365
    forceDirect: true,
  };

  const fileName = overwrite
    ? file.name
    : `${guid(8, 16)}${
        file.name ? file.name.substr(file.name.lastIndexOf(".")) : ".png"
      }`;

  return new Promise(async function (resolve, reject) {
    try {
      let observer = {
        next(res: any) {
          if (updatePercent) {
            updatePercent(res.total.percent.toFixed(2));
          }
        },
        error(err: any) {
          console.log("---上传失败---", err);
          reject(err);
        },
        complete(res: any) {
          const url = DOMAIN + encodeURIComponent(res.key);
          if (updatePercent) {
            updatePercent("100", url);
          }
          // api.auth.updateStorage([
          //   {
          //     url: url,
          //     fileType: file.type,
          //     fileSize: file.size,
          //     nodeKey,
          //   },
          // ]);
          resolve(url);
        },
      };

      if (file.type.includes("video/")) {
        if (file.size > 5242880 * 50) {
          return reject({ msg: "请上传小于100MB的视频！" });
        }
      } else if (file.size > 5242880) {
        return reject({ msg: "请上传小于5MB的文件！" });
      }

      // const res = await api.auth.remainingStorage(file.size);
      const res = { status: 200 };
      if (res.status === 200) {
        // 上传
        let observable = qiniu.upload(
          file,
          fileName,
          uptoken,
          putExtra,
          qiniuConfig
        );
        // 上传开始
        observable.subscribe(observer);
      } else {
        reject(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const uploadImgs = async (
  uptoken: string,
  files: File[],
  accept = "image/*",
  overwrite = false,
  allType?: boolean
) => {
  return new Promise(async function (resolve, reject) {
    try {
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        if (file.type.includes("video/")) {
          if (file.size > 5242880 * 50) {
            return reject({ msg: "请上传小于100MB的视频！" });
          }
        } else if (file.size > 5242880) {
          return reject({ msg: "请上传小于5MB的文件！" });
        }
      }
      const promises = Array.from(new Array(files.length).keys()).map((item) =>
        uploadImg(uptoken, files[item], accept, overwrite, allType)
      );
      Promise.all(promises)
        .then(function (posts) {
          let res = [];
          for (let index = 0; index < files.length; index++) {
            const file = files[index];
            let filetype = file.type;
            if (!filetype) {
              filetype = getFileTypeByName(file.name);
            }
            res.push({
              url: posts[index],
              fileSize: file.size,
              fileType: filetype,
              name: file.name,
            });
          }
          // api.auth.updateStorage(res);
          resolve(res);
        })
        .catch(function (reason) {
          console.log("---error---", reason);
          reject(reason);
        });
    } catch (error) {
      reject(error);
    }
  });
};
