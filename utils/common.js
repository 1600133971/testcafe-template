let fs = require('fs');

let checkFailedTest = function(testName, fixtureName, logPathName) {
  let flag = false;
  JSON.parse('[' + fs.readFileSync(logPathName).toString().replace(/}{/g, '},{') + ']').pop().fixtures.forEach(function(fixture, index) {
    fixture.tests.forEach(function(test, index) {
      if (test.errs.length > 0)
        flag = flag || (fixture.name == fixtureName && test.name == testName);
    });
  });
  return flag;
}

function* elements(element, length) {
  for (let i = 0; i < length; i++) {
    yield element;
  }
}

Date.prototype.format = function(fmt) {
  let getStr = function (element, length) {
    return [...elements(element, length)].join("");
  }

  let o = {
    "y+" : this.getFullYear(),
    "M+" : this.getMonth()+1,
    "d+" : this.getDate(),
    "h+" : this.getHours(),
    "m+" : this.getMinutes(),
    "s+" : this.getSeconds(),
    "S+" : this.getMilliseconds(),
  }; 
  for (let k in o) {
    if (new RegExp("("+ k +")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : ((getStr("0", RegExp.$1.length) + o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt; 
}

let getFmtDate = function () {
  return new Date().format("yyyy-MM-dd_hh-mm-ss-SSS");
} 

module.exports.checkFailedTest = checkFailedTest;
module.exports.getFmtDate = getFmtDate;
