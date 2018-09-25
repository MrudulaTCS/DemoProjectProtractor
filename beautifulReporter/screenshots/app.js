var app = angular.module('reportingApp', []);

app.controller('ScreenshotReportController', function ($scope) {
    $scope.searchSettings = Object.assign({
        description: '',
        allselected: true,
        passed: true,
        failed: true,
        pending: true,
        withLog: true
    }, {}); // enable customisation of search settings on first page hit

    var initialColumnSettings = undefined; // enable customisation of visible columns on first page hit
    if (initialColumnSettings) {
        if (initialColumnSettings.displayTime !== undefined) {
            // initial settings have be inverted because the html bindings are inverted (e.g. !ctrl.displayTime)
            this.displayTime = !initialColumnSettings.displayTime;
        }
        if (initialColumnSettings.displayBrowser !== undefined) {
            this.displayBrowser = !initialColumnSettings.displayBrowser; // same as above
        }
        if (initialColumnSettings.displaySessionId !== undefined) {
            this.displaySessionId = !initialColumnSettings.displaySessionId; // same as above
        }
        if (initialColumnSettings.displayOS !== undefined) {
            this.displayOS = !initialColumnSettings.displayOS; // same as above
        }
        if (initialColumnSettings.inlineScreenshots !== undefined) {
            this.inlineScreenshots = initialColumnSettings.inlineScreenshots; // this setting does not have to be inverted
        }

    }


    $scope.inlineScreenshots = false;
    this.showSmartStackTraceHighlight = true;

    this.chooseAllTypes = function () {
        var value = true;
        $scope.searchSettings.allselected = !$scope.searchSettings.allselected;
        if (!$scope.searchSettings.allselected) {
            value = false;
        }

        $scope.searchSettings.passed = value;
        $scope.searchSettings.failed = value;
        $scope.searchSettings.pending = value;
        $scope.searchSettings.withLog = value;
    };

    this.isValueAnArray = function (val) {
        return isValueAnArray(val);
    };

    this.getParent = function (str) {
        var arr = str.split('|');
        str = "";
        for (var i = arr.length - 2; i > 0; i--) {
            str += arr[i] + " > ";
        }
        return str.slice(0, -3);
    };

    this.getSpec = function (str) {
        return getSpec(str);
    };


    this.getShortDescription = function (str) {
        return str.split('|')[0];
    };

    this.convertTimestamp = function (timestamp) {
        var d = new Date(timestamp),
            yyyy = d.getFullYear(),
            mm = ('0' + (d.getMonth() + 1)).slice(-2),
            dd = ('0' + d.getDate()).slice(-2),
            hh = d.getHours(),
            h = hh,
            min = ('0' + d.getMinutes()).slice(-2),
            ampm = 'AM',
            time;

        if (hh > 12) {
            h = hh - 12;
            ampm = 'PM';
        } else if (hh === 12) {
            h = 12;
            ampm = 'PM';
        } else if (hh === 0) {
            h = 12;
        }

        // ie: 2013-02-18, 8:35 AM
        time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;

        return time;
    };


    this.round = function (number, roundVal) {
        return (parseFloat(number) / 1000).toFixed(roundVal);
    };


    this.passCount = function () {
        var passCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.passed) {
                passCount++;
            }
        }
        return passCount;
    };


    this.pendingCount = function () {
        var pendingCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (result.pending) {
                pendingCount++;
            }
        }
        return pendingCount;
    };


    this.failCount = function () {
        var failCount = 0;
        for (var i in this.results) {
            var result = this.results[i];
            if (!result.passed && !result.pending) {
                failCount++;
            }
        }
        return failCount;
    };

    this.passPerc = function () {
        return (this.passCount() / this.totalCount()) * 100;
    };
    this.pendingPerc = function () {
        return (this.pendingCount() / this.totalCount()) * 100;
    };
    this.failPerc = function () {
        return (this.failCount() / this.totalCount()) * 100;
    };
    this.totalCount = function () {
        return this.passCount() + this.failCount() + this.pendingCount();
    };

    this.applySmartHighlight = function (line) {
        if (this.showSmartStackTraceHighlight) {
            if (line.indexOf('node_modules') > -1) {
                return 'greyout';
            }
            if (line.indexOf('  at ') === -1) {
                return '';
            }

            return 'highlight';
        }
        return true;
    };


    var results = [
    {
        "description": "Should launch the application in the browser|Sample Demo",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "839616a107814d764f641249ef6b4a01",
        "instanceId": 60320,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [
            {
                "level": "WARNING",
                "message": "other - The SSL certificate used to load resources from https://dev.tvac.bt.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1537448387208,
                "type": ""
            },
            {
                "level": "WARNING",
                "message": "https://sport:sport@dev.tvac.bt.com/sportApp/ - The SSL certificate used to load resources from https://dev.tvac.bt.com will be distrusted in M70. Once distrusted, users will be prevented from loading these resources. See https://g.co/chrome/symantecpkicerts for more information.",
                "timestamp": 1537448387223,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://sport:sport@dev.tvac.bt.com/sportApp/js/lib/sisyphus/network/Ajax.js 164 Mixed Content: The page at 'https://sport:sport@dev.tvac.bt.com/sportApp/' was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint 'http://192.168.1.254/oie/oie.cgi'. This request has been blocked; the content must be served over HTTPS.",
                "timestamp": 1537448398879,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://sport:sport@dev.tvac.bt.com/sportApp/js/lib/sisyphus/servicewrap/ConsoleLoggingTarget.js 82:8 \"13:59:58.902\" \"ERROR\" \"sisyphus.network.Ajax\" \"TG002\" \"HTTP request received error response\" Object",
                "timestamp": 1537448398904,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://sport:sport@dev.tvac.bt.com/sportApp/js/lib/sisyphus/servicewrap/ConsoleLoggingTarget.js 82:8 \"13:59:58.953\" \"ERROR\" \"sisyphus.persistence.navmanager.NavManager\" \"TN010\" \"Could not parse NavMan Version - JSON does not contain publishVersion\"",
                "timestamp": 1537448400150,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://sport:sport@dev.tvac.bt.com/sportApp/js/lib/sisyphus/servicewrap/ConsoleLoggingTarget.js 82:8 \"13:59:58.957\" \"ERROR\" \"sisyphus.persistence.vosp.feeds.PinnedItemsData\" \"TO403\" \"Assertion failure\" Object",
                "timestamp": 1537448400150,
                "type": ""
            },
            {
                "level": "SEVERE",
                "message": "https://dev.tvac.bt.com/favicon.ico - Failed to load resource: the server responded with a status of 403 (Forbidden)",
                "timestamp": 1537448400151,
                "type": ""
            }
        ],
        "screenShotFile": "002f0069-0041-00af-0075-00e500a6002f.png",
        "timestamp": 1537448386892,
        "duration": 13280
    },
    {
        "description": "Should select the Login button|Sample Demo",
        "passed": true,
        "pending": false,
        "os": "Windows NT",
        "sessionId": "839616a107814d764f641249ef6b4a01",
        "instanceId": 60320,
        "browser": {
            "name": "chrome",
            "version": "68.0.3440.106"
        },
        "message": "Passed",
        "browserLogs": [],
        "screenShotFile": "00d600a3-0013-0084-00cb-00b200ba0052.png",
        "timestamp": 1537448401434,
        "duration": 5084
    }
];

    this.sortSpecs = function () {
        this.results = results.sort(function sortFunction(a, b) {
    if (a.sessionId < b.sessionId) return -1;else if (a.sessionId > b.sessionId) return 1;

    if (a.timestamp < b.timestamp) return -1;else if (a.timestamp > b.timestamp) return 1;

    return 0;
});
    };

    this.sortSpecs();
});

app.filter('bySearchSettings', function () {
    return function (items, searchSettings) {
        var filtered = [];
        var prevItem = null;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.displaySpecName = false;

            countLogMessages(item);

            var hasLog = searchSettings.withLog && item.browserLogs && item.browserLogs.length > 0;
            if (searchSettings.description === '' ||
                (item.description && item.description.toLowerCase().indexOf(searchSettings.description.toLowerCase()) > -1)) {

                if (searchSettings.passed && item.passed || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.failed && !item.passed && !item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                } else if (searchSettings.pending && item.pending || hasLog) {
                    checkIfShouldDisplaySpecName(prevItem, item);
                    filtered.push(item);
                    prevItem = item;
                }

            }
        }

        return filtered;
    };
});

var isValueAnArray = function (val) {
    return Array.isArray(val);
};

var checkIfShouldDisplaySpecName = function (prevItem, item) {
    if (!prevItem) {
        item.displaySpecName = true;
        return;
    }

    if (getSpec(item.description) != getSpec(prevItem.description)) {
        item.displaySpecName = true;
        return;
    }
};

var getSpec = function (str) {
    var describes = str.split('|');
    return describes[describes.length - 1];
};

var countLogMessages = function (item) {
    if ((!item.logWarnings || !item.logErrors) && item.browserLogs && item.browserLogs.length > 0) {
        item.logWarnings = 0;
        item.logErrors = 0;
        for (var logNumber = 0; logNumber < item.browserLogs.length; logNumber++) {
            var logEntry = item.browserLogs[logNumber];
            if (logEntry.level === 'SEVERE') {
                item.logErrors++;
            }
            if (logEntry.level === 'WARNING') {
                item.logWarnings++;
            }
        }
    }
};
