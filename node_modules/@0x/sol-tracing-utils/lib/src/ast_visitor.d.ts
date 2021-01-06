import * as Parser from 'solidity-parser-antlr';
import { BranchMap, FnMap, OffsetToLocation, StatementMap } from './types';
export interface CoverageEntriesDescription {
    fnMap: FnMap;
    branchMap: BranchMap;
    statementMap: StatementMap;
    modifiersStatementIds: number[];
}
export declare class ASTVisitor {
    private _entryId;
    private readonly _fnMap;
    private readonly _branchMap;
    private readonly _modifiersStatementIds;
    private readonly _statementMap;
    private readonly _offsetToLocation;
    private readonly _ignoreRangesBeginningAt;
    private readonly _ignoreRangesWithin;
    constructor(offsetToLocation: OffsetToLocation, ignoreRangesBeginningAt?: number[]);
    getCollectedCoverageEntries(): CoverageEntriesDescription;
    IfStatement(ast: Parser.IfStatement): void;
    FunctionDefinition(ast: Parser.FunctionDefinition): void;
    ContractDefinition(ast: Parser.ContractDefinition): void;
    ModifierDefinition(ast: Parser.ModifierDefinition): void;
    ForStatement(ast: Parser.ForStatement): void;
    ReturnStatement(ast: Parser.ReturnStatement): void;
    BreakStatement(ast: Parser.BreakStatement): void;
    ContinueStatement(ast: Parser.ContinueStatement): void;
    EmitStatement(ast: any): void;
    VariableDeclarationStatement(ast: Parser.VariableDeclarationStatement): void;
    WhileStatement(ast: Parser.WhileStatement): void;
    ThrowStatement(ast: Parser.ThrowStatement): void;
    DoWhileStatement(ast: Parser.DoWhileStatement): void;
    ExpressionStatement(ast: Parser.ExpressionStatement): void;
    InlineAssemblyStatement(ast: Parser.InlineAssemblyStatement): void;
    AssemblyLocalDefinition(ast: Parser.AssemblyLocalDefinition): void;
    AssemblyCall(ast: Parser.AssemblyCall): void;
    AssemblyIf(ast: Parser.AssemblyIf): void;
    AssemblyBlock(ast: Parser.AssemblyBlock): void;
    AssemblyAssignment(ast: Parser.AssemblyAssignment): void;
    LabelDefinition(ast: Parser.LabelDefinition): void;
    AssemblySwitch(ast: Parser.AssemblySwitch): void;
    AssemblyFunctionDefinition(ast: Parser.AssemblyFunctionDefinition): void;
    AssemblyFor(ast: Parser.AssemblyFor): void;
    SubAssembly(ast: Parser.SubAssembly): void;
    BinaryOperation(ast: Parser.BinaryOperation): void;
    Conditional(ast: Parser.Conditional): void;
    ModifierInvocation(ast: Parser.ModifierInvocation): void;
    private _visitBinaryBranch;
    private _visitStatement;
    private _getExpressionRange;
    private _shouldIgnoreExpression;
    private _visitFunctionLikeDefinition;
}
//# sourceMappingURL=ast_visitor.d.ts.map