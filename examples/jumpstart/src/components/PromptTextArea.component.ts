import { A_Caller, A_Feature, A_Inject, A_Scope } from "@adaas/a-concept";
import { A_Logger } from "@adaas/a-utils/a-logger";
import { Are, AreEvent, AreNode, AreScene, AreStore } from "@adaas/are";


export class PromptTextArea extends Are {

    @Are.Template
    async template(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Logger) logger: A_Logger
    ) {
        logger.info('blue', `PromptTextArea template called... : <${node.aseid.entity}> : `, node.aseid.toString());

        node.setTemplate(`
            <div class="prompt-textarea-container">
                <div class="textarea-wrapper">
                    <textarea 
                        $no-update 
                        @input="onChange" 
                        :value="textValue" 
                        :placeholder="placeholder"
                        :rows="rows"
                        :maxlength="maxLength"
                        class="prompt-textarea"
                    ></textarea>
                    <div class="character-count">
                        <span class="count">{{textValue.length}}</span>
                        <span class="max-count">/ {{maxLength}}</span>
                    </div>
                </div>
                
                <div class="textarea-actions">
                    <button 
                        @click="onClear" 
                        class="clear-btn"
                        :disabled="textValue.length === 0"
                    >
                        Clear
                    </button>
                    <button 
                        @click="onSubmit" 
                        class="submit-btn"
                        :disabled="textValue.trim().length === 0"
                    >
                        Submit
                    </button>
                </div>
                
                <div class="preview-section" v-if="showPreview && textValue.trim().length > 0">
                    <h4 class="preview-title">Preview:</h4>
                    <div class="preview-content">{{textValue}}</div>
                </div>
            </div>
        `);
    }

    @Are.Styles
    async styles(
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(A_Logger) logger: A_Logger
    ) {
        logger.info('blue', `PromptTextArea styles applied... : <${node.aseid.entity}> : `, node.aseid.toString());

        node.setStyles(`
            .prompt-textarea-container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border-radius: 16px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .textarea-wrapper {
                position: relative;
                margin-bottom: 16px;
            }

            .prompt-textarea {
                width: 100%;
                min-height: 120px;
                padding: 16px;
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.95);
                color: #333;
                font-size: 16px;
                line-height: 1.5;
                resize: vertical;
                outline: none;
                transition: all 0.3s ease;
                box-sizing: border-box;
            }

            .prompt-textarea:focus {
                border-color: #4f46e5;
                box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
                background: rgba(255, 255, 255, 1);
            }

            .prompt-textarea::placeholder {
                color: #888;
                font-style: italic;
            }

            .character-count {
                position: absolute;
                bottom: 8px;
                right: 12px;
                font-size: 12px;
                color: #666;
                background: rgba(255, 255, 255, 0.9);
                padding: 2px 6px;
                border-radius: 4px;
                pointer-events: none;
            }

            .count {
                font-weight: 600;
                color: #4f46e5;
            }

            .max-count {
                color: #888;
            }

            .textarea-actions {
                display: flex;
                gap: 12px;
                justify-content: flex-end;
                margin-bottom: 16px;
            }

            .clear-btn,
            .submit-btn {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .clear-btn {
                background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
                color: white;
                box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
            }

            .clear-btn:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
            }

            .clear-btn:active:not(:disabled) {
                transform: translateY(0);
            }

            .submit-btn {
                background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
                color: white;
                box-shadow: 0 4px 15px rgba(74, 222, 128, 0.3);
            }

            .submit-btn:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(74, 222, 128, 0.4);
            }

            .submit-btn:active:not(:disabled) {
                transform: translateY(0);
            }

            .clear-btn:disabled,
            .submit-btn:disabled {
                background: #d1d5db;
                color: #9ca3af;
                cursor: not-allowed;
                box-shadow: none;
                transform: none;
            }

            .preview-section {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 12px;
                padding: 16px;
                border: 2px solid rgba(255, 255, 255, 0.2);
            }

            .preview-title {
                margin: 0 0 12px 0;
                color: #4f46e5;
                font-size: 14px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .preview-content {
                color: #333;
                line-height: 1.6;
                white-space: pre-wrap;
                word-wrap: break-word;
                background: #f8fafc;
                padding: 12px;
                border-radius: 8px;
                border-left: 4px solid #4f46e5;
                max-height: 200px;
                overflow-y: auto;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .prompt-textarea-container {
                    padding: 16px;
                    margin: 0 16px;
                    max-width: none;
                }

                .textarea-actions {
                    flex-direction: column;
                }

                .clear-btn,
                .submit-btn {
                    width: 100%;
                }
            }

            /* Animation for submit button */
            .submit-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.5s;
            }

            .submit-btn:hover::before {
                left: 100%;
            }
        `);
    }

    @Are.Data
    async data(
        @A_Inject(AreStore) store: AreStore,
    ) {
        store.set({
            placeholder: 'Enter your message here...',
            textValue: '',
            rows: 5,
            maxLength: 500,
            showPreview: true,
            lastSubmittedValue: ''
        });
    }

    @Are.EventHandler
    async A_UI_NODE_onBeforeLoad(
        @A_Inject(AreNode) node: AreNode,
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
    ): Promise<void> {
        logger.log('green', `PromptTextArea is initializing... : <${node.aseid.entity}> : `, node.aseid.toString());
    }

    @Are.EventHandler
    async onChange(
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreEvent) event: AreEvent<InputEvent>,
        @A_Inject(AreScene) scene: AreScene,
    ) {
        if (event.data.target === null
            ||
            store.get('textValue') === (event.data.target as HTMLTextAreaElement).value
        ) return;

        const newValue = (event.data.target as HTMLTextAreaElement).value;
        const maxLength = store.get('maxLength');

        // Enforce character limit
        if (newValue.length > maxLength) {
            (event.data.target as HTMLTextAreaElement).value = newValue.substring(0, maxLength);
            return;
        }

        logger.log('green', `PromptTextArea onChange event triggered... : <${node.aseid.entity}> : `, node.aseid.toString(), newValue);

        store.set('textValue', newValue);
        await node.update();
    }

    @Are.EventHandler
    async onSubmit(
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreEvent) event: AreEvent<MouseEvent>,
        @A_Inject(AreScene) scene: AreScene,
    ) {
        const textValue = store.get('textValue');
        
        if (textValue.trim().length === 0) {
            logger.warning('yellow', 'Cannot submit empty text');
            return;
        }

        logger.log('green', `PromptTextArea onSubmit event triggered... : <${node.aseid.entity}> : `, node.aseid.toString(), textValue);

        // Store the submitted value for potential future reference
        store.set('lastSubmittedValue', textValue);

        // Here you could emit a custom event or call a service
        // For now, we'll just log the submission
        console.log('Text submitted:', textValue);

        // Optionally clear after submit
        // store.set('textValue', '');
        // await node.update();
    }

    @Are.EventHandler
    async onClear(
        @A_Inject(A_Scope) scope: A_Scope,
        @A_Inject(A_Caller) node: AreNode,
        @A_Inject(AreStore) store: AreStore,
        @A_Inject(A_Logger) logger: A_Logger,
        @A_Inject(AreEvent) event: AreEvent<MouseEvent>,
        @A_Inject(AreScene) scene: AreScene,
    ) {
        logger.log('green', `PromptTextArea onClear event triggered... : <${node.aseid.entity}> : `, node.aseid.toString());

        store.set('textValue', '');
        await node.update();

        // Focus back to textarea after clearing
        setTimeout(() => {
            const textarea = (event.data.target as HTMLElement)?.closest('.prompt-textarea-container')?.querySelector('.prompt-textarea') as HTMLTextAreaElement;
            if (textarea) {
                textarea.focus();
            }
        }, 100);
    }
}