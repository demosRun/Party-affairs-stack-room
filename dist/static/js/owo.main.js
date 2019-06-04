// build by owo frame!
// Tue Jun 04 2019 16:18:47 GMT+0800 (GMT+08:00)

"use strict";

window.owo = {
  // 页面数据和方法
  script: {
    "one": {
      "created": function created() {
        // 获取屏幕信息
        var screenInfo = $tool.getScreenInfo();
        var WC = screenInfo.clientWidth / 750;
        var HC = screenInfo.clientHeight / 1500;
        var scale = WC > HC ? HC : WC; // console.log((screenInfo.clientWidth - 750 * scale) / 2)
        // console.log(screenInfo.clientWidth - (750 * WC), scale)
        // console.log(screenInfo.clientWidth * scale)

        this.$el.style.transform = "scale(".concat(scale, ", ").concat(scale, ")");
        this.$el.style.left = (screenInfo.clientWidth - 750 * scale) / 2 + 'px';
        this.$el.style.transformOrigin = "0 0 0";
      },
      "close": function close() {
        $go('two', 'moveToLeft', 'moveFromRight');
      }
    },
    "two": {
      "created": function created() {},
      "close": function close() {
        $go('two', 'moveToLeft', 'moveFromRight');
      },
      "template": {
        "searchBar": {
          "created": function created() {
            // 注册输入事件
            this.$el.getElementsByTagName('input')[0].oninput = this.inputValue;
          },
          "cancel": function cancel() {
            // console.log(this)
            this.$el.classList.remove('search-bar-active');
            this.$el.getElementsByTagName('input')[0].value = '';
          },
          "focus": function focus() {
            var _this = this;

            setTimeout(function () {
              _this.$el.classList.add('search-bar-active');
            }, 0);
          },
          "inputValue": function inputValue(e) {
            var searchValue = e.target.value;

            if (searchValue === '') {
              document.getElementsByClassName('search-panel')[0].innerHTML = '';
              return;
            }

            var searchHtml = "";
            var searchList = []; // 搜索

            for (var key in bookData) {
              // 取出第一层-分组
              if (bookData.hasOwnProperty(key)) {
                var element = bookData[key]; // console.log(key)

                for (var key2 in element) {
                  // 取出第二层-分类
                  if (element.hasOwnProperty(key2)) {
                    var element2 = element[key2];

                    for (var key3 in element2) {
                      // 取出第三层-书名
                      var element3 = element2[key3];

                      if (element3.title) {
                        // 判断是否包含关键字
                        if (element3.title.includes(searchValue) || element3.text.includes(searchValue)) {
                          searchList.push({
                            group: key,
                            "class": key2,
                            name: key3,
                            title: element3.title
                          });
                          searchHtml += "<div class=\"search-item\">".concat(element3.title, "</div>");
                        }
                      } else {
                        console.error("".concat(key3, "\u6CA1\u6709\u6807\u9898!"));
                      }
                    }
                  }
                }
              }
            } // console.log(searchList)


            document.getElementsByClassName('search-panel')[0].innerHTML = searchHtml;
          },
          "prop": {}
        },
        "topTab": {
          "created": function created() {
            setTimeout(function () {
              $emit('changeTopBar');
            }, 0);
          },
          "event": {
            "changeTopBar": function changeTopBar() {
              var _this2 = this;

              var html = '';
              var activeItem = owo.global.activeItme;
              var isFirst = true;

              for (var key in bookData[activeItem]) {
                if (isFirst) {
                  owo.global.activeKey = key;
                  html += "<li class=\"active\" @click=\"changeItem\">".concat(key, "</li>");
                  isFirst = false;
                } else {
                  html += "<li @click=\"changeItem\">".concat(key, "</li>");
                }
              }

              this.$el.innerHTML = html;
              setTimeout(function () {
                _owo.handleEvent(_this2.$el, null, 'sd');
              }, 0);
            }
          },
          "changeItem": function changeItem() {
            var domList = this.$el.getElementsByTagName('li');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = domList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var element = _step.value;
                element.classList.remove('active');
              } // 点亮对应项目

            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            this.$event.target.classList.add('active'); // 切换书架内容

            owo.global.activeKey = this.$event.target.innerHTML;
            $emit('changeBookshelf', owo.global.activeItme, owo.global.activeKey);
          },
          "prop": {}
        },
        "bookshelf": {
          "created": function created() {
            setTimeout(function () {
              $emit('changeBookshelf', owo.global.activeItme, owo.global.activeKey);
            }, 0);
          },
          "event": {
            "changeBookshelf": function changeBookshelf(name, activeItme, activeKey) {
              console.log(activeItme, activeKey);
              var html = "";
              var activeItem = bookData[activeItme][activeKey];

              for (var key in activeItem) {
                if (activeItem.hasOwnProperty(key)) {
                  var element = activeItem[key]; // console.log(element)

                  if (element.title) {
                    html += "<div class=\"book-box\"> <div class=\"book icon\">".concat(key, "</div> <div class=\"info\"> <h4>").concat(element.title, "</h4> <p>").concat(element.text, "</p> </div> </div>");
                  } else {
                    html += "<div class=\"book-box\"> <div class=\"book icon\">".concat(key, "</div> <div class=\"info\"><p>").concat(element.text, "</p> </div> </div>");
                  }
                }
              }

              this.$el.getElementsByClassName('bookshelf')[0].innerHTML = html;
            }
          },
          "prop": {}
        },
        "bottomBar": {
          "created": function created() {
            var _this3 = this;

            setTimeout(function () {
              _this3.$el.getElementsByTagName('li')[0].classList.add('active');
            }, 0);
          },
          "changeItem": function changeItem(item) {
            var domList = this.$el.getElementsByTagName('li');
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = domList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var element = _step2.value;
                element.classList.remove('active');
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            this.$event.target.classList.add('active');
            owo.global.activeItme = item;
            $emit('changeTopBar');
            setTimeout(function () {
              $emit('changeBookshelf', owo.global.activeItme, owo.global.activeKey);
            }, 0);
          },
          "prop": {}
        }
      }
    }
  },
  // 页面默认入口
  entry: "one"
};

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

if (!owo) {
  console.error('没有找到owo核心!');
} // 注册owo默认变量
// 框架状态变量


owo.state = {}; // 框架全局变量

owo.global = {}; // 全局方法变量

owo.tool = {}; // 事件推送方法

var $emit = function $emit(eventName) {
  var _arguments = arguments;
  var event = owo.state.event[eventName];
  event.forEach(function (element) {
    // 注入运行环境运行
    element.fun.apply(_owo.assign(element.script, {
      $el: element.dom,
      activePage: window.owo.activePage
    }), _arguments);
  });
}; // 便捷的获取工具方法


var $tool = owo.tool;
var $data = {}; // 框架核心函数

var _owo = {}; // 对象合并方法

_owo.assign = function (a, b) {
  var newObj = {};

  for (var key in a) {
    newObj[key] = a[key];
  }

  for (var key in b) {
    newObj[key] = b[key];
  }

  return newObj;
}; // 针对低版本IE浏览器做兼容处理


if (!document.getElementsByClassName) {
  document.getElementsByClassName = function (className, element) {
    var children = (element || document).getElementsByTagName('*');
    var elements = new Array();

    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var classNames = child.className.split(' ');

      for (var j = 0; j < classNames.length; j++) {
        if (classNames[j] == className) {
          elements.push(child);
          break;
        }
      }
    }

    return elements;
  };
}

_owo.runCreated = function (pageFunction, entryDom) {
  // 注入运行环境运行
  pageFunction.created.apply(_owo.assign(pageFunction, {
    $el: entryDom,
    data: pageFunction.data,
    activePage: window.owo.activePage
  }));
};

_owo.registerEvent = function (pageFunction, entryDom) {
  // 判断是否包含事件监听
  if (pageFunction.event) {
    if (!window.owo.state.event) window.owo.state.event = {};

    for (var iterator in pageFunction.event) {
      if (!window.owo.state.event[iterator]) window.owo.state.event[iterator] = [];
      window.owo.state.event[iterator].push({
        dom: entryDom,
        pageName: window.owo.activePage,
        fun: pageFunction.event[iterator],
        script: pageFunction
      });
    }
  }
}; // 运行页面所属的方法


_owo.handlePage = function (pageName, entryDom) {
  _owo.handleEvent(entryDom, null, entryDom); // 判断页面是否有自己的方法


  var newPageFunction = window.owo.script[pageName];
  if (!newPageFunction) return; // console.log(newPageFunction)
  // 如果有created方法则执行

  if (newPageFunction.created) {
    _owo.runCreated(newPageFunction, entryDom);
  } // 注册事件监听


  _owo.registerEvent(newPageFunction, entryDom); // 判断页面是否有下属模板,如果有运行所有模板的初始化方法


  for (var key in newPageFunction.template) {
    var templateScript = newPageFunction.template[key];

    if (templateScript.created) {
      // 获取到当前配置页的DOM
      // 待修复,临时获取方式,这种方式获取到的dom不准确
      var domList = document.querySelectorAll('[template="' + key + '"]'); // 有时候在更改html时会将某些块进行删除

      if (domList.length == 0) {
        console.info('无法找到页面组件:' + key);
      } // console.log(domList.length)


      for (var ind = 0; ind < domList.length; ind++) {
        _owo.runCreated(templateScript, domList[ind]); // 注册事件监听


        _owo.registerEvent(templateScript, domList[ind]);
      }
    }
  }
}; // owo-name处理


_owo.handleEvent = function (tempDom, templateName, entryDom) {
  // console.log(templateName)
  var activePage = window.owo.script[owo.activePage];

  if (tempDom.attributes) {
    for (var ind = 0; ind < tempDom.attributes.length; ind++) {
      var attribute = tempDom.attributes[ind]; // 判断是否为owo的事件
      // ie不支持startsWith

      if (attribute.name[0] == '@') {
        var eventName = attribute.name.slice(1);
        var eventFor = attribute.textContent;

        switch (eventName) {
          case 'show':
            {
              // 初步先简单处理吧
              var temp = eventFor.replace(/ /g, ''); // 取出条件

              var condition = temp.split("==");

              if (activePage.data[condition[0]] != condition[1]) {
                tempDom.style.display = 'none';
              }

              break;
            }

          default:
            {
              // 处理事件
              tempDom["on" + eventName] = function (event) {
                // 因为后面会对eventFor进行修改所以使用拷贝的
                var eventForCopy = eventFor; // 判断页面是否有自己的方法

                var newPageFunction = window.owo.script[window.owo.activePage]; // console.log(this.attributes)

                if (templateName) {
                  // 如果模板注册到newPageFunction中，那么证明模板没有script那么直接使用eval执行
                  if (newPageFunction.template) {
                    newPageFunction = newPageFunction.template[templateName];
                  } else {
                    eval(eventForCopy);
                    return;
                  }
                } // 待优化可以单独提出来
                // 取出参数


                var parameterArr = [];
                var parameterList = eventForCopy.match(/[^\(\)]+(?=\))/g);

                if (parameterList && parameterList.length > 0) {
                  // 参数列表
                  parameterArr = parameterList[0].split(','); // 进一步处理参数

                  for (var i = 0; i < parameterArr.length; i++) {
                    var parameterValue = parameterArr[i].replace(/(^\s*)|(\s*$)/g, ""); // console.log(parameterValue)
                    // 判断参数是否为一个字符串

                    if (parameterValue.charAt(0) === '"' && parameterValue.charAt(parameterValue.length - 1) === '"') {
                      parameterArr[i] = parameterValue.substring(1, parameterValue.length - 1);
                    }

                    if (parameterValue.charAt(0) === "'" && parameterValue.charAt(parameterValue.length - 1) === "'") {
                      parameterArr[i] = parameterValue.substring(1, parameterValue.length - 1);
                    } // console.log(parameterArr[i])

                  }

                  eventForCopy = eventForCopy.replace('(' + parameterList + ')', '');
                } else {
                  // 解决 @click="xxx()"会造成的问题
                  eventForCopy = eventForCopy.replace('()', '');
                } // console.log(newPageFunction)
                // 如果有方法,则运行它


                if (newPageFunction[eventForCopy]) {
                  // 绑定window.owo对象
                  // console.log(tempDom)
                  // 待测试不知道这样合并会不会对其它地方造成影响
                  newPageFunction.$el = entryDom;
                  newPageFunction.$event = event;
                  newPageFunction[eventForCopy].apply(newPageFunction, parameterArr);
                } else {
                  // 如果没有此方法则交给浏览器引擎尝试运行
                  eval(eventForCopy);
                }
              };
            }
        }
      }
    }
  }

  if (tempDom.children) {
    // 递归处理所有子Dom结点
    for (var i = 0; i < tempDom.children.length; i++) {
      var childrenDom = tempDom.children[i]; // console.log(childrenDom)

      var newTemplateName = templateName;

      if (tempDom.attributes['template'] && tempDom.attributes['template'].textContent) {
        newTemplateName = tempDom.attributes['template'].textContent;
      } // 待修复，逻辑太混乱了


      var _temp = tempDom.attributes['template'] ? tempDom : entryDom;

      if (newTemplateName === owo.entry) {
        _owo.handleEvent(childrenDom, null, _temp);
      } else {
        _owo.handleEvent(childrenDom, newTemplateName, _temp);
      }
    }
  } else {
    console.info('元素不存在子节点!');
    console.info(tempDom);
  }
}; // 跳转到指定页面


function $go(pageName, inAnimation, outAnimation, param) {
  owo.state.animation = {
    "in": inAnimation,
    "out": outAnimation
  };
  var paramString = '';

  if (param && _typeof(param) == 'object') {
    paramString += '?'; // 生成URL参数

    for (var paramKey in param) {
      paramString += paramKey + '=' + param[paramKey] + '&';
    } // 去掉尾端的&


    paramString = paramString.slice(0, -1);
  }

  window.location.href = paramString + "#" + pageName;
}

function $change(key, value) {
  // 更改对应的data
  owo.script[owo.activePage].data[key] = value; // 当前页面下@show元素列表

  var showList = document.getElementById('o-' + owo.activePage).querySelectorAll('[\\@show]');
  showList.forEach(function (element) {
    // console.log(element)
    var order = element.attributes['@show'].textContent; // console.log(order)
    // 去掉空格

    order = order.replace(/ /g, '');

    if (order == key + '==' + value) {
      element.style.display = '';
    } else {
      element.style.display = 'none';
    }
  });
} // 获取URL #后面内容


function getarg(url) {
  var arg = url.split("#");
  return arg[1];
} // 页面资源加载完毕事件


_owo.ready = function () {
  // 取出URL地址判断当前所在页面
  var pageArg = getarg(window.location.hash); // 从配置项中取出程序入口

  var page = pageArg ? pageArg.split('?')[0] : owo.entry;

  if (page) {
    var entryDom = document.getElementById('o-' + page);

    if (entryDom) {
      // 显示主页面
      entryDom.style.display = 'block';
      window.owo.activePage = page; // 更改$data链接

      $data = owo.script[page].data;

      _owo.handlePage(page, entryDom);
    } else {
      console.error('入口文件设置错误,错误值为: ', entryDom);
    }
  } else {
    console.error('未设置程序入口!');
  } // 设置状态为dom准备完毕


  window.owo.state.isRrady = true; // 判断是否有需要运行的其他方法

  if (window.owo.state.created != undefined) {
    window.owo.state.created.forEach(function (element) {
      // 运行对应的方法
      element();
    });
  }
}; // url发生改变事件


window.onhashchange = function (e) {
  var oldUrlParam = getarg(e.oldURL); // 如果旧页面不存在则为默认页面

  if (!oldUrlParam) oldUrlParam = owo.entry;
  var newUrlParam = getarg(e.newURL); // 如果没有跳转到任何页面则跳转到主页

  if (newUrlParam === undefined) {
    newUrlParam = owo.entry;
  } // 如果没有发生页面跳转则不需要进行操作
  // 切换页面特效


  switchPage(oldUrlParam, newUrlParam);
};
/*
 * 传递函数给whenReady()
 * 当文档解析完毕且为操作准备就绪时，函数作为document的方法调用
 */


_owo.whenReady = function () {
  //这个函数返回whenReady()函数
  var funcs = []; //当获得事件时，要运行的函数

  var ready = false; //当触发事件处理程序时,切换为true
  //当文档就绪时,调用事件处理程序

  function handler(e) {
    if (ready) return; //确保事件处理程序只完整运行一次
    //如果发生onreadystatechange事件，但其状态不是complete的话,那么文档尚未准备好

    if (e.type === 'onreadystatechange' && document.readyState !== 'complete') {
      return;
    } //运行所有注册函数
    //注意每次都要计算funcs.length
    //以防这些函数的调用可能会导致注册更多的函数


    for (var i = 0; i < funcs.length; i++) {
      funcs[i].call(document);
    } //事件处理函数完整执行,切换ready状态, 并移除所有函数


    ready = true;
    funcs = null;
  } //为接收到的任何事件注册处理程序


  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', handler, false);
    document.addEventListener('readystatechange', handler, false); //IE9+

    window.addEventListener('load', handler, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', handler);
    window.attachEvent('onload', handler);
  } //返回whenReady()函数


  return function whenReady(fn) {
    if (ready) {
      fn.call(document);
    } else {
      funcs.push(fn);
    }
  };
}();

_owo.whenReady(_owo.ready);

function switchPage(oldUrlParam, newUrlParam) {
  var oldPage = oldUrlParam.split('&')[0];
  var newPage = newUrlParam.split('&')[0]; // 查找页面跳转前的page页(dom节点)
  // console.log(oldUrlParam)
  // 如果源地址获取不到 那么一般是因为源页面为首页

  if (oldPage === undefined) {
    oldPage = owo.entry;
  }

  var oldDom = document.getElementById('o-' + oldPage);

  if (oldDom) {
    // 隐藏掉旧的节点
    oldDom.style.display = 'none';
  } // 查找页面跳转后的page


  var newDom = document.getElementById('o-' + newPage); // console.log(newDom)

  if (newDom) {
    // 隐藏掉旧的节点
    newDom.style.display = 'block';
  } else {
    console.error('页面不存在!');
    return;
  }

  window.owo.activePage = newPage; // 更改$data链接

  $data = owo.script[newPage].data;

  _owo.handlePage(newPage, newDom);
}
/**
* 获取屏幕信息
* @return {object} 屏幕信息
*/


owo.tool.getScreenInfo = function () {
  // 有可能不兼容ie
  return {
    clientWidth: window.innerWidth,
    clientHeight: window.innerHeight,
    ratio: window.innerWidth / window.innerHeight,
    // 缩放比例
    devicePixelRatio: window.devicePixelRatio || 1
  };
};