/**
 * Created by Hexl on 2015/9/8.
 */
(function() {
    'use strict';

    /**
     * @name  config
     * @description config block
     */
    function config($stateProvider) {
        $stateProvider
            .state('root.browse-condition', {
                url: '/browse-condition',
                views: {
                    '@': {
                        templateUrl: 'src/app/browse-question/browse-condition.tpl.html',
                        controller: 'BrowseConditionCtrl'
                    }
                }
            });
    }

    /**
     * @name  AccountBindingCtrl
     * @description Controller
     */
    function BrowseConditionCtrl($scope, $log, $q, $http, $rootScope, $location) {
        var initPage = function() {
            $scope.subjectList = [{
                name: '选择学科',
                id: '-1'
            }];
            $scope.currentSubject = $scope.subjectList[0];
            $scope.chapterList = [{
                name: '选择章节',
                id: '-1'
            }];
            $scope.currentChapter = $scope.chapterList[0];
            $scope.qTypeList = [{
                name: '选择题型',
                id: '-1'
            }];
            $scope.currentQType = $scope.qTypeList[0];
            var getSubjects = function() {
                return $http.get($rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface003.ashx');
            };
            console.log(getSubjects+"--asd");
            var getChapter = function(courseId) {
                return $http({
                    method: 'post',
                    url: $rootScope.subDomain + $rootScope.InterfaceRouter + '/WXInterface006.ashx',
                    data: {
                        courseId: courseId
                    }
                });
            };

            var getQType = function(chapterId) {
                return $http({
                    method: 'post',
                    url: $rootScope.subDomain + '/BootStrap/Interface' + '/Interface0096.ashx',
                    data: {
                        chapterId: chapterId
                    }
                });
            };

            getSubjects().then(function(resp) {
                var subjects = _.map(resp.data.course, function(subject) {
                    return {
                        name: subject.courseName,
                        id: subject.courseId
                    }
                });
                $scope.subjectList.splice(1);
                $scope.subjectList = $scope.subjectList.concat(subjects);
            });

            $scope.$watch('currentSubject', function(subject) {
                if (subject.id !== '-1') {
                    getChapter(subject.id).then(function(resp) {
                        var chapters = [];
                        _.each(resp.data.msg, function(chapter) {
                            _.each(chapter.section, function(section) {
                                var sectionTemp = {
                                    name: section.sectionName,
                                    id: section.sectionId
                                };
                                chapters.push(sectionTemp);
                            });
                        });
                        $scope.chapterList.splice(1);
                        $scope.chapterList = $scope.chapterList.concat(chapters);
                    });
                } else {
                    $scope.currentChapter = $scope.chapterList[0];
                    $scope.currentQType = $scope.qTypeList[0];
                }
            });

            $scope.$watch('currentChapter', function(chapter) {
                if (chapter.id !== '-1') {
                    getQType(chapter.id).then(function(resp) {
                        var qTypes = _.map(resp.data.msg, function(qType) {
                            return {
                                name: qType.qtypename,
                                id: qType.qtypeid
                            };
                        });
                        $scope.qTypeList.splice(1);
                        $scope.qTypeList = $scope.qTypeList.concat(qTypes);
                        $scope.currentQType = $scope.qTypeList[0];
                    });
                } else {
                    $scope.currentQType = $scope.qTypeList[0];
                }
            });

            $http({
                method: 'post',
                url: $rootScope.baseDomain + $rootScope.InterfaceRouter + '/WXInterface022.ashx',
                data: {
                    courseId: $scope.currentSubject.courseId
                }
            }).then(function (resp) {
                //console.log($scope.currentSubject.courseId + "----adn");
                var time = $scope.time = resp.data.time;
                var uprank = $scope.uprank = resp.data.uprank;
                var upscores = $scope.upscores = resp.data.upscores;
            });

            $scope.handlerList = [{
                name: '掌握',
                id: '1'
            }, {
                name: '欠缺',
                id: '2'
            }, {
                name: '不懂',
                id: '3'
            }];

            $scope.selectSubject = function(data) {
                $scope.currentSubject = data;
            };
            $scope.selectChapter = function(data) {
                $scope.currentChapter = data;
            };
            $scope.selectQType = function(data) {
                $scope.currentQType = data;
            };

            $scope.selectHandler = function(data) {
                if ($scope.currentHandler === data) {
                    $scope.currentHandler = undefined;
                } else {
                    $scope.currentHandler = data;
                }
            };

            $scope.checkQuestions = function() {
                //todo go to question browse page
                var subjectId = $scope.currentSubject && $scope.currentSubject.id || '';
                var chapterId = $scope.currentChapter && $scope.currentChapter.id || '';
                var qTypeId = $scope.currentQType && $scope.currentQType.id || '';
                var handler = $scope.currentHandler && $scope.currentHandler.id || '';

                if ($scope.currentSubject.id == "-1") {

                    $rootScope.$broadcast('Get_Message', '请选择学科！');

                } else {

                    if ($scope.currentChapter.id == "-1") {
                        location.hash = '/browse-question?chapter=' + subjectId +
                        '&qType=' + qTypeId + '&handler=' + handler + '&id=' + $location.search().id;
                    } else {
                        location.hash = '/browse-question?chapter=' + chapterId +
                                            '&qType=' + qTypeId + '&handler=' + handler + '&id=' + $location.search().id;
                    }
                }
            };

        };

        initPage();

        $scope.$emit('Init_header', {
            title: '浏览题库',
            showBack: true
        });
    }

    angular.module('browse-condition', [])
        .config(config)
        .controller('BrowseConditionCtrl', BrowseConditionCtrl);
})();