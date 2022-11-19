M.mod_mindmap = {};

M.mod_mindmap.init_lock = function (Y, mindmapid, locked, uid, vid) {

    if (uid == 0) {
        Y.io('lock.php', {
            method: 'POST',
            data: 'id=' + mindmapid + '&lock=1&uid=' + vid + '',
            sync: false
        });
        uid = vid;
    }

    // When moving away from mindmap.
    if (uid == vid) {
        window.onbeforeunload = function (e) {

            var confirm = M.util.get_string('mindmapunlocked', 'mindmap');
            e = e || window.event;

            if (uid == vid || uid == 0) {
                Y.io('lock.php', {
                    method: 'POST',
                    data: 'id=' + mindmapid + '&lock=0&uid=0',
                    sync: false
                });
            }

            // For IE and Firefox.
            if (e) {
                e.returnValue = confirm;
            }
            // For Safari.
            return confirm;

        };
    }
};