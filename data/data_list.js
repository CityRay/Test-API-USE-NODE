exports.getList = [
    {//API
        'description': 'API_1',
        'uri': 'http://10.10.10.10/api/getsomething'
    },
    {//API2
        'description': 'API_2',
        'uri': 'http://10.10.10.10/api/getsomething2'
    },

];

exports.postList = [
    {
        'uri': 'http://10.10.10.10/api/updatesomething',
        'data': {
            'StoreID':00000000000000000,
            'MemberID':69,
            'IsPromote':true
        }
    },
    {
        'uri': 'http://10.10.10.10/api/updatesomething',
        'data': {}
    }
];
