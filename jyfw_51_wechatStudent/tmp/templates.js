﻿(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/dialog.tpl.html",
    "<div class=\"dialog\">\n" +
    "	<div class='alertArea'>\n" +
    "		<div class='backgrondArea'></div>\n" +
    "		<div class='msg' ></div>\n" +
    " 		<div class='confirm' ng-click=\"confirmFunction()\">OK</div>\n" +
    " 	</div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/footer.tpl.html",
    "<div class=\"pure-g\">\n" +
    "  <div class=\"pure-u-1 text-center\">\n" +
    "    <p>&copy; 2014 - <a href=\"http://alessandro.arnodo.net\">Alessandro Arnodo.</a>\n" +
    "  </div>\n" +
    "  <div class=\"pure-u-1 text-center\">\n" +
    "    <ul class=\"hlist\">\n" +
    "      <li><a target=\"_blank\" href=\"http://twitter.com/vesparny\">twitter</a>\n" +
    "      </li>\n" +
    "      <li><a target=\"_blank\" href=\"https://plus.google.com/+AlessandroArnodo\">g+</a>\n" +
    "      </li>\n" +
    "      <li><a target=\"_blank\" href=\"http://www.linkedin.com/in/alessandroarnodo\">LinkedIn</a>\n" +
    "      </li>\n" +
    "      <li><a target=\"_blank\" href=\"https://github.com/vesparny/angular-kickstart\">GitHub</a>\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/common/header.tpl.html",
    "<div class=\"pure-menu pure-menu-open pure-menu-horizontal header\">\n" +
    "  <a class=\"pure-menu-heading\" href=\"\" ng-show=\"showBack\" ng-click=\"goBack()\" style=\"display: block;\n" +
    "  width: 80px; height: 50px;\">\n" +
    "    <i class=\"fa fa-angle-left\"></i>\n" +
    "  </a>\n" +
    "  <ul>\n" +
    "    <li ng-bind=\"title\"></li>\n" +
    "  </ul>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
   $templateCache.put("src/app/account-binding/account-binding.tpl.html",
    "<div class=\"account-binding pure-g-r\">\n" +
    "  <span class=\"pure-u-1-1 button-dropdown button-dropdown-primary\" data-buttons=\"dropdown\">\n" +
    "    <button class=\"pure-u-1-1 button button-primary\">\n" +
    "        <span ng-bind=\"currentSchool.name\"></span><i class=\"vertical-align fa fa-angle-down\"></i>\n" +
    "    </button>\n" +
    "\n" +
    "    <ul class=\"button-dropdown-list\">\n" +
    "        <li ng-repeat=\"school in schoolList\" ng-click=\"selectSchool(school)\">\n" +
    "            <a ng-bind=\"school.name\"></a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "  </span>\n" +
    "    <span class=\"pure-u-1-1 button-dropdown button-dropdown-primary\" data-buttons=\"dropdown\">\n" +
    "        <button class=\"pure-u-1-1 button button-primary\">\n" +
    "            <span ng-bind=\"currentRelation.name\"></span><i class=\"vertical-align fa fa-angle-down\"></i>\n" +
    "        </button>\n" +
    "\n" +
    "        <ul class=\"button-dropdown-list\">\n" +
    "            <li ng-repeat=\"relation in relationList\" ng-click=\"selectRelation(relation)\">\n" +
    "                <a ng-bind=\"relation.name\"></a>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "      </span>\n" +
    "    <div class=\"pure-u-1-1 btn-input account\">\n" +
    "        <input type=\"text\" ng-model=\"accountName\" placeholder=\"用户名\"/>\n" +
    "    </div>\n" +
    "    <div class=\"pure-u-1-1 btn-input pwd\">\n" +
    "        <input type=\"password\" ng-model=\"password\" placeholder=\"密码\"/>\n" +
    "    </div>\n" +
    "    <span class=\"pure-u-1-1 submit-btn\" >\n" +
    "    <button class=\"pure-u-1-1 button button-primary button-wide\" ng-click=\"submitBinding()\">\n" +
    "        <i class=\"fa fa-check\"></i><span style=\"margin-left: 0.8em\">绑定</span>\n" +
    "    </button>\n" +
    "  </span>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/browse-question/browse-condition.tpl.html",
    "<div class=\"browse-condition pure-g-r\">\n" +
    "    <span class=\"pure-u-1-1 button-dropdown button-dropdown-primary\" data-buttons=\"dropdown\">\n" +
    "    <button class=\"pure-u-1-1 button button-primary\">\n" +
    "        <span ng-bind=\"currentSubject.name\"></span><i class=\"vertical-align fa fa-angle-down\"></i>\n" +
    "    </button>\n" +
    "\n" +
    "    <ul class=\"button-dropdown-list\">\n" +
    "        <li ng-repeat=\"subject in subjectList\" ng-click=\"selectSubject(subject)\">\n" +
    "             <a ng-class='btn btn-primary' ng-bind=\"subject.name\"></a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "  </span>\n" +
    "    <span class=\"pure-u-1-1 button-dropdown button-dropdown-primary\" data-buttons=\"dropdown\">\n" +
    "    <button class=\"pure-u-1-1 button button-primary\">\n" +
    "        <span ng-bind=\"currentChapter.name\"></span><i class=\"vertical-align fa fa-angle-down\"></i>\n" +
    "    </button>\n" +
    "\n" +
    "    <ul class=\"button-dropdown-list\">\n" +
    "        <li ng-repeat=\"chapter in chapterList\" ng-click=\"selectChapter(chapter)\">\n" +
    "            <a ng-bind=\"chapter.name\"></a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "  </span>\n" +
    "    <span class=\"pure-u-1-1 button-dropdown button-dropdown-primary\" data-buttons=\"dropdown\">\n" +
    "    <button class=\"pure-u-1-1 button button-primary\">\n" +
    "        <span ng-bind=\"currentQType.name\"></span><i class=\"vertical-align fa fa-angle-down\"></i>\n" +
    "    </button>\n" +
    "\n" +
    "    <ul class=\"button-dropdown-list\">\n" +
    "        <li ng-repeat=\"qType in qTypeList\" ng-click=\"selectQType(qType)\">\n" +
    "            <a ng-bind=\"qType.name\"></a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "  </span>\n" +
    "    <section class=\"pure-u-1-1 handler-type-group\">\n" +
    "        <div class=\"handler-type\" ng-class=\"{active: currentHandler === handler}\"\n" +
    "             ng-repeat=\"handler in handlerList\" ng-click=\"selectHandler(handler)\">\n" +
    "            <div class=\"handle-container\">\n" +
    "                <i class=\"fa\" ng-class=\"{'fa-check-square-o': $parent.currentHandler === handler,\n" +
    "            'fa-square-o': $parent.currentHandler !== handler}\"></i>\n" +
    "                <span ng-bind=\"handler.name\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    <section class=\"pure-u-1-1 query-btn\">\n" +
    "        <div class=\"button button-primary button-wide\" ng-click=\"checkQuestions()\">\n" +
    "            <i class=\"fa fa-search\"></i>\n" +
    "            <span style=\"margin-left: 1em\">查看试题</span>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/browse-question/browse-question.tpl.html",
    "<div class=\"browse-question pure-g-r\">\n" +
    "    <!--<span class=\"pure-u-1-1 button-dropdown button-dropdown-primary\" data-buttons=\"dropdown\">-->\n" +
    "        <!--<button class=\"pure-u-1-1 button button-primary\">-->\n" +
    "            <!--<span ng-bind=\"currentQType.name\"></span><i class=\"vertical-align fa fa-angle-down\"></i>-->\n" +
    "        <!--</button>-->\n" +
    "\n" +
    "        <!--<ul class=\"button-dropdown-list\">-->\n" +
    "            <!--<li ng-repeat=\"qType in qTypeList\" ng-click=\"selectQType(qType)\">-->\n" +
    "                <!--<a ng-bind=\"qType.name\"></a>-->\n" +
    "            <!--</li>-->\n" +
    "        <!--</ul>-->\n" +
    "    <!--</span>-->\n" +
    "    <section class=\"pure-u-1-1 question-container\">\n" +
    "        <header></header>\n" +
    "        <article>\n" +
    "            <div class=\"area question-area\" ng-show=\"currentShow === 'QUESTION'\"\n" +
    "                 ng-bind-html=\"currentQuestion.question | trustHtml\"></div>\n" +
    "            <div class=\"area option-area\" ng-show=\"currentShow === 'QUESTION'\">\n" +
    "                <ul ng-show=\"!!currentQuestion.optionA\">\n" +
    "                    <li ng-show=\"!!currentQuestion.optionA\">\n" +
    "                        A、<div style=\"display: inline-block\" ng-bind-html=\"currentQuestion.optionA | trustHtml\"></div>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"!!currentQuestion.optionB\">\n" +
    "                        B、<div style=\"display: inline-block\" ng-bind-html=\"currentQuestion.optionB | trustHtml\"></div>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"!!currentQuestion.optionC\">\n" +
    "                        C、<div style=\"display: inline-block\" ng-bind-html=\"currentQuestion.optionC | trustHtml\"></div>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"!!currentQuestion.optionD\">\n" +
    "                        D、<div style=\"display: inline-block\" ng-bind-html=\"currentQuestion.optionD | trustHtml\"></div>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"!!currentQuestion.optionE\">\n" +
    "                        E、<div style=\"display: inline-block\" ng-bind-html=\"currentQuestion.optionE | trustHtml\"></div>\n" +
    "                    </li>\n" +
    "                    <li ng-show=\"!!currentQuestion.optionF\">\n" +
    "                        F、<div style=\"display: inline-block\" ng-bind-html=\"currentQuestion.optionF | trustHtml\"></div>\n" +
    "                    </li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <div class=\"area answer-area\" ng-show=\"currentShow === 'ANSWER'\"\n" +
    "                 ng-bind-html=\"currentQuestion.answer | trustHtml\"></div>\n" +
    "            <div class=\"area analysis-area\" ng-show=\"currentShow === 'ANALYSIS'\"\n" +
    "                 ng-bind-html=\"currentQuestion.analysis | trustHtml\"></div>\n" +
    "        </article>\n" +
    "    </section>\n" +
    "    <section class=\"pure-u-1-1 btn-group\">\n" +
    "        <div class=\"btn btn-answer\" ng-hide=\"currentShow === 'ANSWER'\" ng-click=\"showAnswer()\">答案</div>\n" +
    "        <div class=\"btn btn-analysis\" ng-class=\"{'left-0': currentShow === 'ANSWER'}\" ng-hide=\"currentShow === 'ANALYSIS'\"\n" +
    "             ng-click=\"showAnalysis()\">解析\n" +
    "        </div>\n" +
    "        <div class=\"btn btn-question\" ng-hide=\"currentShow === 'QUESTION'\" ng-click=\"showQuestion()\">题目</div>\n" +
    "    </section>\n" +
    "    <section class=\"pure-u-1-1 handler-type-group\">\n" +
    "        <div class=\"handler-type\" ng-class=\"{active: currentHandler === handler}\"\n" +
    "             ng-repeat=\"handler in handlerList\" ng-click=\"selectHandler(handler)\">\n" +
    "            <div class=\"handle-container\">\n" +
    "                <i class=\"fa\" ng-class=\"{'fa-check-square-o': $parent.currentHandler === handler,\n" +
    "            'fa-square-o': $parent.currentHandler !== handler}\"></i>\n" +
    "                <span ng-bind=\"handler.name\"></span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    <article class=\"pagination\">\n" +
    "        <div class=\"page-indicator pre\" ng-class=\"{disable: currentIndex === 0}\" ng-click=\"pre()\">\n" +
    "            <i class=\"fa fa-angle-left\"></i>\n" +
    "            <span style=\"margin-left: 0.2em;\">上一题</span>\n" +
    "        </div>\n" +
    "        <div class=\"page-indicator no\" >\n" +
    "            <span ng-bind=\"currentIndex+1\"></span>&nbsp;/&nbsp;<span ng-bind=\"totalNumber\"></span>\n" +
    "        </div>\n" +
    "        <div class=\"page-indicator next\" ng-class=\"{disable: currentIndex+1 === totalNumber}\" ng-click=\"next()\">\n" +
    "            <span>下一题</span>\n" +
    "            <i style=\"margin-left: 0.2em;\" class=\"fa fa-angle-right\"></i>\n" +
    "        </div>\n" +
    "    </article>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/buy-service/buy-service.tpl.html",
    "<div class=\"buy-service pure-g-r\">\n" +
    "    <section class=\"desc pure-u-1-1\">\n" +
    "        <header>\n" +
    "            <div class=\"title\">购买/价格说明</div>\n" +
    "            <div class=\"info-icon fa fa-info-circle\"></div>\n" +
    "        </header>\n" +
    "        <article>\n" +
    "            51教育服务增值服务包括：①成绩与试卷查看②极速测试③查看错题④浏览题库⑤补偿作业打印⑥错题及相关知识点打印⑦记忆重点打印\n" +
    "            <br>\n" +
    "            51教育服务增值服务价格：每学期500元，一次选择两学期及以上9折，一次选择初中六学期8.5折\n" +
    "        </article>\n" +
    "    </section>\n" +
    "    <!--<section class=\"pure-u-1-1 service-type\" style=\"margin-top: 1.5em;\">-->\n" +
    "        <!--<header>请选择您所需的服务</header>-->\n" +
    "        <!--<article>-->\n" +
    "            <!--<div class=\"select-btn-group\">-->\n" +
    "                <!--<div class=\"select_btn select_btn-large\" ng-repeat=\"service in serviceList\"-->\n" +
    "                     <!--ng-class=\"{active: currentService === service}\" ng-click=\"selectService(service)\">-->\n" +
    "                    <!--<i class=\"fa fa-check-circle-o\"></i>-->\n" +
    "                    <!--<span ng-bind=\"service.name\"></span>-->\n" +
    "                <!--</div>-->\n" +
    "            <!--</div>-->\n" +
    "        <!--</article>-->\n" +
    "    <!--</section>-->\n" +
    "    <section class=\"pure--yu-1-1 class-type\" style=\"margin-top: 1.5em;\">\n" +
    "        <header>请选择年级</header>\n" +
    "        <article>\n" +
    "            <div class=\"select-btn-group\">\n" +
    "                <div class=\"select_btn select_btn-small\" ng-repeat=\"classX in classList\"\n" +
    "                     ng-class=\"{active: currentClassList.indexOf(classX) >= 0}\" ng-click=\"selectClass(classX)\">\n" +
    "                    <i class=\"fa fa-check-circle-o\"></i>\n" +
    "                    <span ng-bind=\"classX.name\"></span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </article>\n" +
    "    </section>\n" +
    "    <section class=\"total\" style=\"margin-top: 1.5em;\">\n" +
    "        您的折扣是：<span class=\"text-danger\" ng-bind=\"zhekou\"></span>折&nbsp;&nbsp;购买总价：<span class=\"text-danger\"\n" +
    "                                                                                            ng-bind=\"total\">180</span>元\n" +
    "    </section>\n" +
    "    <section class=\"pure-u-1-1 btn-group\" style=\"margin-top: 1.5em;\">\n" +
    "        <div class=\"button button-primary button-wide\" ng-click=\"buy()\">\n" +
    "            <i class=\"fa fa-cart-plus\"></i><span style=\"margin-left: 0.8em\">购买</span>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "</div>");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/getting-started/getting-started.tpl.html",
    "<div class=\"pure-g island3\">\n" +
    "  <div class=\"content pure-u-1\">\n" +
    "    <p class=\"island-panel\">\n" +
    "      <strong>Note that this is only a getting started guide, for more detailed information about the build system, the available tasks, the configuration of the build or anything else, please refer to the <a href=\"https://github.com/vesparny/angular-kickstart/#readme\" target=\"_blank\">documentation</a> on the GitHub project.</strong>\n" +
    "    </p>\n" +
    "\n" +
    "    <h3>What and Why</h3>\n" +
    "    <p>\n" +
    "      <code>angular-kickstart</code> is an opinionated kickstart for single page application development with AngularJS. It makes your development and testing easy, keeps the structure of the project consistent and allows you to create a fully optimized\n" +
    "      production release withe ease. After having developed a lot of AngularJS projects I decided to collect here what I've learnt.\n" +
    "    </p>\n" +
    "\n" +
    "    <h3>Getting started</h3>\n" +
    "    <p>\n" +
    "      Install\n" +
    "      <strong><a href=\"https://github.com/joyent/node/wiki/installation\" target=\"_blank\">node.js</a></strong>. Then\n" +
    "      <strong>sass, gulp and bower</strong> if you haven't yet.\n" +
    "    </p>\n" +
    "\n" +
    "    <pre>\n" +
    "    <code>\n" +
    "    $ gem install sass\n" +
    "    $ npm -g install gulp bower\n" +
    "    </code>\n" +
    "</pre>\n" +
    "\n" +
    "    <p>\n" +
    "      After that, install\n" +
    "      <code>angular-kickstart</code> - download the <a href=\"https://github.com/vesparny/angular-kickstart/releases/latest\">latest</a> release (or clone the master branch if want to run the development version). Unzip the project and cd into it, then\n" +
    "      install bower and npm dependencies, and run the application in development mode.\n" +
    "    </p>\n" +
    "\n" +
    "    <pre>\n" +
    "    <code>\n" +
    "    $ npm install\n" +
    "    $ bower install\n" +
    "    $ gulp serve\n" +
    "    </code>\n" +
    "</pre>\n" +
    "\n" +
    "    <p>\n" +
    "      You are now ready to go, your applcation is available at <code>http://127.0.0.1:3000</code>.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      You are now ready to start coding, every file you add, edit or delete into the\n" +
    "      <code>/client</code> folder, will be handled by the build system and the browser will reload.\n" +
    "    </p>\n" +
    "    <p>\n" +
    "      When you are ready to build a production release there is a task for that.\n" +
    "    </p>\n" +
    "\n" +
    "    <pre>\n" +
    "    <code>\n" +
    "    $ gulp serve:dist\n" +
    "    </code>\n" +
    "</pre>\n" +
    "\n" +
    "    <p>\n" +
    "      This task will lint your code, optimize css js and images files, run unit tests. After the task has successfully finished, you can find an optimized version of your project in the\n" +
    "      <code>/build/dist</code> folder.\n" +
    "    </p>\n" +
    "\n" +
    "    <p>\n" +
    "      Other tasks are available:\n" +
    "    </p>\n" +
    "\n" +
    "    <pre>\n" +
    "    <code>\n" +
    "    #for developing running unit test on every file change.\n" +
    "    $ gulp serve:tdd\n" +
    "\n" +
    "    #for running e2e test. (you application should be running on http://127.0.0.1:3000)\n" +
    "    $ gulp test:e2e\n" +
    "\n" +
    "    #for running unit tests one time then exit.\n" +
    "    $ gulp test:unit\n" +
    "    </code>\n" +
    "</pre>\n" +
    "    <p class=\"text-center\">\n" +
    "      <a href=\"https://github.com/vesparny/angular-kickstart/#readme\" target=\"_blank\" class=\"pure-button button-xlarge pure-button-primary\">\n" +
    "        Full documentation on GitHub\n" +
    "      </a>\n" +
    "    </p>\n" +
    "\n" +
    "  </div>\n" +
    "</div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates"); }
catch(err) { module = angular.module("templates", []); }
module.run(["$templateCache", function($templateCache) {
  "use strict";
  $templateCache.put("src/app/score/score.tpl.html",
    "<div class=\"score pure-g-r\">\n" +
    "    <section class=\"pure-u-1-1 subject\">\n" +
    "        <div class=\"pure-menu pure-menu-open pure-menu-horizontal subject-menu\">\n" +
    "            <ul>\n" +
    "                <li class=\"subject-item\" ng-repeat=\"subject in subjectList\"\n" +
    "                    ng-class=\"{'pure-menu-selected': currentSubject === subject}\" ng-click=\"selectSubject(subject,$index)\">\n" +
    "                    <a>{{ subject.name }}</a>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "    </section>\n" +
    "    <article class=\"pure-u-1-1 scores\">\n" +
    "        <ul>\n" +
    "            <li class=\"score-item\" ng-repeat=\"score in scoreList\">\n" +
    "                <p class=\"title\" ng-bind=\"score.title\" ng-click=\"showPaper(score)\"></p>\n" +
    "                <div class=\"score-detail\">\n" +
    "                    <p>总分：<span ng-bind=\"score.total\"></span></p>\n" +
    "                    <p>平均分：<span ng-bind=\"score.average\"></span></p>\n" +
    "                    <p>最高分：<span ng-bind=\"score.maxscores\"></span></p>\n" +
    //"                    <p>第&nbsp;<span ng-bind=\"score.no\"></span>&nbsp;名</p>\n" +
    "                    <p>\n" +
    "                        <span ng-class=\"{up: score.up_down === '↑',down: score.up_down=== '↓',\n" +
    "                        stay: score.up_down==='-'}\" ng-bind=\"score.up_down\"></span>\n" +
    "                        <span class=\"diff\" ng-bind=\"score.ndirection\"></span>\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "                <hr />\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </article>\n" +
    "</div>");
}]);
})();
