/**
 *
 * We are given a singly-linked list where each node holds either a 0 or 1. These values
 * represent a binary number, with the most significant bit at the head. Our goal is to return
 * the decimal value of this binary number. We can think of this as reading a binary number 
 * from left to right. Each bit we read contributes to the final decimal number, just like 
 * when converting binary to decimal on paper. For each bit we multiply the current total by 2 
 * and add the current node's value.
 *
 */

#include <stdio.h>
#include <stdlib.h>

// Definition for singly-linked list.
struct ListNode
{
    int val;
    struct ListNode *next;
};

int getDecimalValue(struct ListNode *head)
{
    int result = 0;
    while (head != NULL){
        result = result * 2 + head->val;
        head = head->next;
    }
    return result;
}

void appendNode(struct ListNode** head, int val){
    if (*head == NULL){
        *head = createNode(val);
        return;
    }
    struct ListNode* curr = *head;
    while (curr->next != NULL){
        curr = curr->next;
    }
    curr->next = createNode(val);
}

void freeList(struct ListNode *head)
{
    while (head != NULL)
    {
        struct ListNode *temp = head;
        head = head->next;
        free(temp);
    }
}

int main() {
    int binary[] = {1,0,1};
    int n = sizeof(binary) / sizeof(binary[0]);

    struct ListNode* head = NULL;

    for (int i = 0; i < n; i++){
        appendNode(&head, binary[i]);
    }

    int result = getDecimalValue(head);
    printf("Decimal value: %n", result);

    freeList(head);
    return 0;
}

/**
 * 
 * Run time is O(n)
 * Space time is O(1)
 * 
 */