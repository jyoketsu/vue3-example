export const is_mobile = () => {
  let regex_match =
    /(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220|Mobile)/i;
  let u = navigator.userAgent;
  if (null == u) {
    return true;
  }
  let result = regex_match.exec(u);

  if (null == result) {
    return false;
  } else {
    return true;
  }
};

export const guid = (len?: number, radix?: number) => {
  var chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | (Math.random() * radix)];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
    uuid[14] = "4";

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join("");
};

export function getFileTypeByName(name: string) {
  const fileExtension = name.split(".").pop();
  if (
    fileExtension === "jpg" ||
    fileExtension === "png" ||
    fileExtension === "jpeg"
  ) {
    return "image/*";
  } else if (
    fileExtension === "mp3" ||
    fileExtension === "aac" ||
    fileExtension === "wav"
  ) {
    return "audio/*";
  } else if (fileExtension === "mp4") {
    return "video/*";
  } else if (fileExtension === "pdf") {
    return "application/pdf";
  } else if (
    fileExtension === "docx" ||
    fileExtension === "doc" ||
    fileExtension === "xls" ||
    fileExtension === "xlsx" ||
    fileExtension === "ppt" ||
    fileExtension === "pptx"
  ) {
    return "application/msword";
  } else {
    return "unknow";
  }
}

export const rgb2hsv = (r: number, g: number, b: number) => {
  r = r / 255;
  g = g / 255;
  b = b / 255;
  let h, s, v;
  let min = Math.min(r, g, b);
  let max = (v = Math.max(r, g, b));
  let l = (min + max) / 2;
  let difference = max - min;

  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / difference + (g < b ? 6 : 0);
        break;
      case g:
        h = 2.0 + (b - r) / difference;
        break;
      case b:
        h = 4.0 + (r - g) / difference;
        break;
    }
    h = Math.round((h || 0) * 60);
  }
  if (max == 0) {
    s = 0;
  } else {
    s = 1 - min / max;
  }
  s = Math.round(s * 100);
  v = Math.round(v * 100);
  return [h, s, v];
};

export const rgbDistance = (rgbArr1: number[], rgbArr2: number[]) => {
  const r3 = (rgbArr1[0] - rgbArr2[0]) / 256;
  const g3 = (rgbArr1[1] - rgbArr2[1]) / 256;
  const b3 = (rgbArr1[2] - rgbArr2[2]) / 256;

  const diff = Math.sqrt(r3 * r3 + g3 * g3 + b3 * b3);
  return diff;
};

export const hsvDistance = (hsvArr1: number[], hsvArr2: number[]) => {
  const [H_1, S_1, V_1] = hsvArr1;
  const [H_2, S_2, V_2] = hsvArr2;
  const R = 100;
  const angle = 30;
  const h = R * Math.cos((angle / 180) * Math.PI);
  const r = R * Math.sin((angle / 180) * Math.PI);
  const x1 = r * V_1 * S_1 * Math.cos((H_1 / 180) * Math.PI);
  const y1 = r * V_1 * S_1 * Math.sin((H_1 / 180) * Math.PI);
  const z1 = h * (1 - V_1);
  const x2 = r * V_2 * S_1 * Math.cos((H_2 / 180) * Math.PI);
  const y2 = r * V_2 * S_1 * Math.sin((H_2 / 180) * Math.PI);
  const z2 = h * (1 - V_2);
  const dx = x1 - x2;
  const dy = y1 - y2;
  const dz = z1 - z2;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
};

export function download(url: string, fileName: string) {
  var a = document.createElement("a");
  var filename = fileName;
  a.href = url;
  a.download = filename;
  a.click();
}

export function isElectron() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.indexOf(" electron/") > -1) {
    return true;
  } else {
    return false;
  }
}

export function getDeviceType() {
  const ua = window.navigator.userAgent.toLowerCase();
  const matchs = ua.match(
    /electron|micromessenger|Android|webOS|iPhone|Macintosh|windows/i
  );
  return matchs && matchs.length ? matchs[0] : 1;
}

export function getDefaultLanguage() {
  const languages = ["zh-TW", "ja", "zh-CN", "zh", "en"];
  const localStorageLan = localStorage.getItem("LOCALE");
  if (localStorageLan && languages.includes(localStorageLan)) {
    return localStorageLan;
  } else {
    const systemLan = navigator.language;
    if (systemLan && languages.includes(systemLan)) {
      return systemLan;
    } else {
      return "en";
    }
  }
}
