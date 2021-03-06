﻿(function () {
    var utils = T.Utils;

    T.tooltipTimeout = 5000;

    ko.bindingHandlers.tooltip = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            var value = valueAccessor();
            var bindings = allBindingsAccessor();

            if (value) {
                var data;
                if (value.constructor === String)
                    data = { html: value, target: $(element), position: bindings.position };
                else
                    data = value;
                T.createNode(element, { path: '/Common/tooltip', data: data }, utils.extractNode(bindingContext));
            }

        }
    };

    T.renderTooltips = function (tooltips, topic, parentPane, show) {
        if ($.isArray(tooltips))
            for (var i = 0; i < tooltips.length; i++)
                renderTooltip(tooltips[i], true);
        else
            for (var property in tooltips)
                if (tooltips.hasOwnProperty(property)) {
                    renderTooltip(tooltips[property], show !== false);// && Store(tipShownKey(property)) !== true);
                    //if (show !== false)
                    //    Store(tipShownKey(property), true);
                }

        function renderTooltip(tooltip, autoShow) {
            var target = $(parentPane.element).find(tooltip.selector);
            if (target.length > 0) {
                if (parentPane.element)
                    T.insertNodeAfter(target, { path: '/Common/tooltip', data: extend(tooltip, autoShow) });
            } else {
                T.logger.warn("Tooltip for selector " + tooltip.selector + " not rendered - element not found");
            }
        }

        function extend(tooltip, autoShow) {
            return $.extend({ timeout: T.tooltipTimeout, topic: topic, autoShow: autoShow && !tooltip.hover, target: $(parentPane.element).find(tooltip.selector) }, tooltip);
        }

        function tipShownKey(property) {
            return "tooltip.shown: " + parentPane.path + '.' + property;
        }
    };

})();