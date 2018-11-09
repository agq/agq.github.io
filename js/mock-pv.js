$(document).ready(function () {
    "use strict";

    //mock change soc
    var interval = 5000;
    setInterval(mockChangeAll,interval);
    mockChangeAll();
    
    function mockChangeAll() {
        var pvIds = [];
        pvIds.push('pv1');
        pvIds.push('pv2');
        pvIds.push('pv3');

        pvIds.forEach(mockChange);
    }

    function mockPV(){
        var pv = {};
        pv['val']=(Math.random() * 100).toFixed(0);
        pv['per'] = pv['val'];

        return pv;
    }

    function mockChange(pid) {

        var stored = localStorage.getItem(pid);
        var pv;
        if(stored == "undefined" || stored == null){
            pv = mockPV();
            localStorage.setItem(pid, JSON.stringify(pv));
        }else{
            pv = $.parseJSON(stored);
        }
        pv.pid = pid;

        if(pv['val']>90){
            pv['val']=90;
        }
        //mock pv
        var change= (Math.random() * 4).toFixed(0);
        if(change>2){
            change = 2-change;
        }
        pv['val'] = new Number(pv['val'])+new Number(change);
        pv['per'] = (pv['val']).toFixed(0);

        localStorage.setItem(pid, JSON.stringify(pv));

        updatePv(pv);
    }

    function updatePv(pv){

        $('#'+pv.pid).text(pv.val);
        $('#'+pv.pid+'p').text(pv.per+'%');
    }

});
