import { Component, Input } from '@angular/core';

export interface TreeNode {
  name: string;
  children?: TreeNode[];
}
@Component({
  selector: 'app-tree-node',
  template: `
  <div *ngIf="node.name">{{node.name}}</div>
  <ul>
    <li *ngFor="let node of node.children">
      <app-tree-node [node]="node"></app-tree-node>
    </li>
  </ul>
`
})
export class TreeNodeComponent {
  @Input() node: TreeNode;
}

