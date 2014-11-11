/* 
 Created on : Sep 22, 2014, 7:03:28 PM
 Author     : Eliza Krajewska
 */
var DataCMSHandler = function($scope) {
    
    // Mockup - in Real System these data are collected from server
    $scope.contents = [
        {title: 'Lorem ipsum #1', name: 'Anna', comment: '3 comments', pub_date: '2014-05-07 15:00',
            up_date: '2014-05-07 15:00',type:'Article', section:'Standard', language:'English'},
        {title: 'Lorem ipsum #2', name: 'Kasia', comment: '3 comments', pub_date: '2014-05-07 14:00',
            up_date: '',type:'Article', section:'Standard', language:'English'},
        {title: 'Lorem ipsum #3', name: 'Anna', comment: '', pub_date: '2014-05-07 13:00',
            up_date: '',type:'Forum Post', section:'Forum', language:'Polish'},
        {title: 'Lorem ipsum #4', name: 'Eliza', comment: '25 comments', pub_date: '2014-05-07 12:00', 
             up_date: '2014-05-07 15:00',type:'Blog Post', section:'Blog', language:'French'},
        {title: 'Lorem ipsum #5', name: 'Anna', comment: '35 comments', pub_date:'2014-05-07 11:00',
             up_date: '2014-05-07 15:00',type:'Blog Post', section:'Blog', language:'English'}
    ];
    
    //functions to operate on the scope.contents
    $scope.sendEventFromContentSelection = function(index){
        oojs.selectRow(index +1);
    };
};


