import React from 'react';
import { shallow, mount } from 'enzyme';
import DocumentArea from '../src/js/DocumentArea/DocumentArea'
import UploadModal from '../src/js/Dashboard/UploadModal';
import Dashboard from '../src/js/Dashboard/Dashboard'

describe('Uploading documents', () => {
    
 // Storage Mock
  function storageMock() {
    var storage = {};

        return {
            setItem: function(key, value) {
                storage[key] = value || '';
            },
            getItem: function(key) {
                return key in storage ? storage[key] : null;
            },
            removeItem: function(key) {
                delete storage[key];
            },
            get length() {
                return Object.keys(storage).length;
            },
            key: function(i) {
                var keys = Object.keys(storage);
                return keys[i] || null;
            }
        };
    }


    // mock the localStorage
    window.localStorage = storageMock();
    const userProp = {    
                    id: 1,
                    username: 'Username',
                    name: 'Name',
                    email: 'email@email.com',
                    password: 'hashed',
                }
    let doc =  {    
                    id: 1,
                    name: 'New Document', 
                    createdAt: '2017-03-27 23:55:15.769-04', 
                    updatedAt: '2017-03-27 23:55:15.769-04',
                    courseId: 1
                 }

    it('calls componentDidMount', () => {
    
    expect(
        shallow(
            <Dashboard />
        ).length
    ).toEqual(1);
  });



  it('will add a new document to the state once uploaded', () => {

          //document has already been uploaded
    const dashboard = shallow(<Dashboard />);
        expect(dashboard.state().documents.length).toEqual(0);

    dashboard.setProps({user: userProp});



      dashboard.instance().updateDocuments(doc);          
        expect(dashboard.state('documents').length).toEqual(1); 
        expect(dashboard.state('documents')[0].name).toEqual('New Document');
        expect(dashboard.state('documents')[0].user.username).toEqual('Username');
  });

  it('will add a new thumbnail to the page once uploaded', () => {

    const dashboard = mount(<Dashboard />);
        expect(dashboard.contains(<DocumentArea />)).toEqual(false);

        dashboard.instance().updateDocuments(doc);
        dashboard.instance().updateDocuments(doc);

        expect(dashboard.contains(<DocumentArea />)).toEqual(true);


  })



});