// Type definitions for @ag-grid-community/core v25.0.1
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { IAgLabel } from './agAbstractLabel';
import { AgAbstractField, FieldElement } from './agAbstractField';
export interface IInputField extends IAgLabel {
    value?: any;
    width?: number;
}
export declare abstract class AgAbstractInputField<TElement extends FieldElement, TValue, TConfig extends IInputField = IInputField> extends AgAbstractField<TValue, TConfig> {
    private readonly inputType;
    private readonly displayFieldTag;
    protected readonly eLabel: HTMLElement;
    protected readonly eWrapper: HTMLElement;
    protected readonly eInput: TElement;
    constructor(config?: TConfig, className?: string, inputType?: string, displayFieldTag?: string);
    protected postConstruct(): void;
    protected refreshLabel(): void;
    protected addInputListeners(): void;
    private setInputType;
    getInputElement(): TElement;
    setInputWidth(width: number | 'flex'): this;
    setInputName(name: string): this;
    getFocusableElement(): HTMLElement;
    setMaxLength(length: number): this;
    setInputPlaceholder(placeholder: string): this;
    setInputAriaLabel(label: string): this;
    setDisabled(disabled: boolean): this;
}
