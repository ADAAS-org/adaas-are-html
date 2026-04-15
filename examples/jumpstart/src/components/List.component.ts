import { A_Caller, A_Inject } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are } from "@adaas/are";
import { AreContext } from "@adaas/are";
import { AreEvent } from "@adaas/are";
import { AreNode } from "@adaas/are";
import { AreStore } from "@adaas/are";


export class ListComponent extends Are {

    @Are.Template
    async template(
        @A_Inject(A_Caller) node: AreNode,
    ) {


        node.setContent(`
         <div class="menu-section">Main</div>
        <ul class="menu">
            <li @click="$handleClick('Dashboard')" :class="active==='Dashboard' ? 'menu-item-active' : ''" class="menu-item "><span class="menu-icon">⊞</span> <span class="menu-text">{{item1}}</span></li>
            <li $if="active=='Dashboard'" @click="$handleClick('Users')" :class="active==='Users' ? 'menu-item-active' : ''" class="menu-item"><span class="menu-icon">⊡</span> <span class="menu-text">{{item2}}</span> <span class="menu-badge">{{usersBadge}}</span></li>
            <li @click="$handleClick('Products')" :class="active==='Products' ? 'menu-item-active' : ''" class="menu-item"><span class="menu-icon">⊠</span> <span class="menu-text">{{item3}}</span></li>
            <li @click="$handleClick('Orders')" :class="active==='Orders' ? 'menu-item-active' : ''" class="menu-item"><span class="menu-icon">⊟</span> <span class="menu-text">{{item4}}</span></li>
        </ul>
        <div class="menu-section">System</div>    
            <button @click="$add">Add +</button>
            <ul class="menu">
                <li 
                $for="item in items" @click="$handleClick(item.name)"
                $if="active=='Dashboard'" 
                :class="active===item.name ? 'menu-item-active' : ''" 
                class="menu-item">
                <span class="menu-icon">⊙</span> 
                <span class="menu-text">{{item.name}}</span> 
                <span $if="item.badge > 0" class="menu-badge">{{item.badge}}</span>
                <button @click="$remove(item)">+</button>
                </li>
            </ul>
        `);
    }

    @Are.Data
    async data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            active: 'Dashboard',
            item1: 'Dashboard',
            item2: 'Users',
            item3: 'Products',
            item4: 'Orders',
            item5: 'Messages',
            item6: 'Settings',
            usersBadge: '24',
            msgBadge: '3',
            items: [
                { name: 'Messages', badge: 3 },
                { name: 'Settings', badge: 0 },
            ]
        });
    }
    @Are.EventHandler
    add(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        const currentItems = store.get('items') || [];

        currentItems.push({
            name: `Item ${currentItems.length + 1}`,
            badge: 0
        });

        store.set('items', currentItems);
    }


    @Are.EventHandler
    remove(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        const itemToRemove = event.get('args')?.[0];

        console.log('Removing item:', itemToRemove, 'from store:', store);

        if (!itemToRemove) {
            logger.warning('No item specified for removal');
            return;
        }

        const currentItems = store.get('items') || [];
        const updatedItems = currentItems.filter((item: any) => item.name !== itemToRemove.name);

        store.set('items', updatedItems);
    }

    @Are.EventHandler
    async handleClick(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreEvent) event: AreEvent,
        @A_Inject(AreContext) context: AreContext,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ) {
        try {
            console.log('Menu item clicked!', event.get('args'), store);

            const item = event.get('args')?.[0] || 'Dashboard';


            store.set('active', item);

            // for (const root of context.roots) {
            //     root.update();
            // }

            // node.parent!.update();
            context.endPerformance('Click');
            logger.info(`Menu item clicked: ${item}`, ...context.performance);

            // store.owner.parent?.emit(new AreEvent('menuItemClicked').set('section', item));

        } catch (error) {
            logger.error(error);
        }


        // store.set('active', store.get('active') === 'menu-item-active' ? '' : 'menu-item-active');
    }
}
