var currentIssueForSummary =0;
var currentIssueForViolation =0;
var totalIssues = 0;

let template = [
    {
        "<>": "tr", 'obj': function () {
            return (this.violations)
        }, 'html': [
            {
                "<>": "span", "html": [
                    {
                        function() {
                            totalIssues += this.nodes.length;
                        }
                    },
                ]
            }
        ]
    },



    {
        "<>": "div", "class": "summary", "html": [
            {
                "<>": "div", "class": "tool-summary", "html": [
                    {"<>": "h2", "html": "Tools"},
                    {
                        "<>": "li",
                        "html": "<strong>Test engine: </strong>${testEngine.name} version ${testEngine.version}"
                    },
                    {"<>": "li", "html": "<strong>Test runner: </strong>${testRunner.name}"},
                   
                ]
            },
            {
                "<>": "div", "class": "assessment-summary", "html": [
                    {"<>": "h1", "html": "Accessibility Audit"},
                    {
                        '<>': 'p', 'html': function () {
                            return ('<strong>Date of assessment:</strong> ' + new Date(this.timestamp).toLocaleString());// + "<br><strong>Page URL:</strong> <a href='" + this.url + "' target='_blank' title='Visit page'>" + this.url + "</a>";
                        }
                    },
                    {
                        "<>": "span",
                        "html": "<strong>Page URL:</strong> <a href='${url}' style=\"display:flex;align-items:center;\">" +
                            "                    <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" aria-hidden=\"true\" width=\"24\" height=\"24\" style=\"flex-shrink:0;fill:white;margin-right:5px;\">\n" +
                            "                        <path d=\"M0 0h24v24H0z\" fill=\"none\"></path>\n" +
                            "                        <path d=\"M12 2a10 10 0 0 0-9.95 9h11.64L9.74 7.05a1 1 0 0 1 1.41-1.41l5.66 5.65a1 1 0 0 1 0 1.42l-5.66 5.65a1 1 0 0 1-1.41 0 1 1 0 0 1 0-1.41L13.69 13H2.05A10 10 0 1 0 12 2z\"></path>\n" +
                            "                    </svg>${url}</a>"
                    },
                ]}
        ]
    },


    {
        '<>': 'h2', 'html': function () {
            return ('<span class="count-of-violations">' + totalIssues + '</span> violations found');
        }
    },

    {
        "<>": "table", "html": [
            {"<>": "tr", "html": "<th>#</th><th>Axe rule ID</th><th>Description</th><th>Impact</th><th>Count</th>"},

            {
                "<>": "tr", 'obj': function () {
                    return (this.violations)
                }, 'html': [
                    {
                        "<>": "div", "html": [

                            {
                                '<>': 'td', 'html': function () {
                                    currentIssueForSummary+=1;
                                    return ("<a href='#view-" + this.id + "-issues' title='View violations'>" + currentIssueForSummary + "</a>");
                                }
                            },

                            // {"<>": "td", "html": "<a href='#view-${id}-issues'>Go to issue</a>"},
                            // {"<>": "td", "html": "<a href='${helpUrl}' target='_blank'>${id}</a>"},
                            {"<>": "td", "html": "${id}"},
                            {"<>": "td", "text": "${description}"},
                            // {"<>": "td", "html": "${tags}"},
                            {"<>": "td", "html": "<span class='tag tag-${impact}'>${impact}</span>"},
                            {
                                '<>': 'td', 'text': function () {
                                    return (this.nodes.length);
                                }
                            },
                        ]
                    }
                ]
            },




        ]


    },

    {"<>": "h2", "html": "Violations"},
    {
        "<>": "section", "id":"view-${id}-issues", "class": "violation-section", 'obj': function () {
            return (this.violations)
        }, 'html': [
            {
                "<>": "div", "class": "violation-title", "html": [

                    {
                        "<>": "div", "html": [
                            {"<>": "span", "class":"learn-more", "html": "<a href='${helpUrl}' target='_blank' title='Visit Deque University to learn more about this type of violation'>Learn more about ${id}</a>"},
                            {
                                '<>': 'h3', "class": "header", 'html': function () {
                                    currentIssueForViolation+=1;
                                    return (currentIssueForViolation + '. ' + this.help );
                                }
                            },
                            // {"<>": "p", "html": "<span class='axe-id'>${id}</span>" },
                            {"<>": "p", "html": "${description}"},
                            {"<>": "p", "html": "Impact: <span class='tag tag-${impact}'>${impact}</span>"},
                            {"<>": "p", "html": "Tags: <span class='a11y-tags'>${tags}</span>"},
                            // {"<>": "span", "html": "Impact: ${impact}"},
                        ]
                    }
                ]
            },

            {
                "<>": "table", "html": [
                    {
                        "<>": "tr", 'obj': function () {
                            return (this.nodes)
                        }, 'html': [
                            {
                                "<>": "td", "html": [
                                    {
                                        "<>": "td", "text": "Element Location:", "html": [
                                            {"<>": "code", "text": "${target}"},
                                            {
                                                "<>": "span", "text": "Element Source:","html": [
                                                    {"<>": "code", "text": "${html}"}
                                                ]
                                            },
                                        ]
                                    },
                                ]
                            },
                            {
                                "<>": "td", "html": [
                                    {
                                        "<>": "span",  "text": "To solve this violation, you need to...", "html": [
                                            {"<>": "code", "text": "${failureSummary}"}
                                        ]
                                    },
                                ]
                            },
                        ]
                    }
                ]
            },


        ]
    },
]