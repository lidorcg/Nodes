import { Template } from 'meteor/templating';

import Node from '/imports/api/nodes/nodes.js';

import './home.html';

Template.Home.onCreated(function() {
  // subscriptions
  this.autorun(() => {
    let nodesSubscription = this.subscribe('nodes.all');
    if(nodesSubscription.ready()) {
      const nodes = Node.find();

      const visNodes = nodes.map(n => ({id: n._id, label: n.title}));
      console.log(visNodes);

      // create an array with edges [[{f,t},{f,t},{f,t}][{f,t},{f,t}]]
      const nestedEdges = nodes.map(n => n.getTags().map(t => ({from: n._id, to: t._id})));
      const visEdges = nestedEdges.reduce((acc, x) => ([...acc, ...x]), []);
      console.log(visEdges);

      // create a network
      const container = document.getElementById('tree');

      // provide the data in the vis format
      const data = {
         nodes: new vis.DataSet(visNodes),
         edges: new vis.DataSet(visEdges),
      };
      const options = {};

      // initialize your network!
      const network = new vis.Network(container, data, options);
    }
  })
});
