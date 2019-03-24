import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TreeNode } from 'src/app/sidebar/sidebar.component';



/** Flat node with expandable and level information */
interface TreeTagFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-tree-tags',
  templateUrl: './tree-tags.component.html',
  styleUrls: ['./tree-tags.component.scss']
})
export class TreeTagsComponent implements OnInit {

  @Input() nodes$: Observable<TreeNode[]>;
  @Output() select = new EventEmitter<{path: string, selected: boolean}>();

  checklistSelection = new SelectionModel<TreeTagFlatNode>(true /* multiple */);

  treeControl = new FlatTreeControl<TreeTagFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    (node: TreeNode, level: number) => {
      return {
        expandable: !!node.children && node.children.length > 0,
        name: node.name,
        level,
      };
    },
    node => node.level,
    node => node.expandable,
    node => node.children
  );

  dataSource$: Observable<MatTreeFlatDataSource<TreeNode, TreeTagFlatNode>>;

  constructor() {
  }

  hasChild = (_: number, node: TreeTagFlatNode) => node.expandable;

  getLevel = (node: TreeTagFlatNode) => node.level;

  ngOnInit() {
    const dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.dataSource$ = this.nodes$.pipe(
      map(nodes => {
        dataSource.data = nodes;
        return dataSource;
      })
    );
  }

  /** Whether all the descendants of the node are selected. */
  descendantsAllSelected(node: TreeTagFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    return descAllSelected;
  }

  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: TreeTagFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TreeTagFlatNode): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);

    // Force update for the parent
    descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    this.checkAllParentsSelection(node);
  }

 getParentPath = (node) => {
    if (!node) { return null; }
    if (!node.name) {return null; }
    const parent = this.getParentNode(node);
    const parentPath = this.getParentPath(parent);
    return [...(parentPath || []), node.name];
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TreeTagFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);

    const path = this.getParentPath(node).join('/');

    this.select.emit({path, selected: this.checklistSelection.isSelected(node)});
  }

  addSelection(node) {
    if (!node) { return null; }
    if (!node.name) {return null; }
    const path = this.getParentPath(node).join('/');

    this.select.emit({path, selected: true});
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TreeTagFlatNode): void {
    let parent: TreeTagFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TreeTagFlatNode): void {
    const nodeSelected = this.checklistSelection.isSelected(node);
    const descendants = this.treeControl.getDescendants(node);
    const descAllSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (nodeSelected && !descAllSelected) {
      this.checklistSelection.deselect(node);
    } else if (!nodeSelected && descAllSelected) {
      this.checklistSelection.select(node);
    }
  }

    /* Get the parent node of a node */
    getParentNode(node: TreeTagFlatNode): TreeTagFlatNode | null {
      const currentLevel = this.getLevel(node);

      if (currentLevel < 1) {
        return null;
      }

      const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

      for (let i = startIndex; i >= 0; i--) {
        const currentNode = this.treeControl.dataNodes[i];

        if (this.getLevel(currentNode) < currentLevel) {
          return currentNode;
        }
      }
      return null;
    }
}
