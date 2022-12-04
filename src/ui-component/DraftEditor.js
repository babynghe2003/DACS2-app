import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, CompositeDecorator, DefaultDraftBlockRenderMap } from 'draft-js';
import { Immutable, Map } from 'immutable';
import { Col, Row } from 'react-bootstrap';
import { styleMap, fonts } from './action';
import BlockStyleControls from './component/BlockStyleControls';
import InlineStyleControls from './component/InlineStyleControls';
import BlockComponent from './component/BlockComponent';
import createTable from './component/createTable';
import MediaComponent from './table/MediaComponent';

import './css/editor.css';
import './css/controlPanel.css';
import Table from './component/Table';

export default function Editor() {
    const decorator = new CompositeDecorator([
        {
            strategy: findLinkEntities,
            component: Link
        },
        {
            strategy: findTableEntities,
            component: Tables
        }
    ]);

    function fontFamelyStyles(fs) {
        let styleFonts = document.head.appendChild(document.createElement('style'));
        let arrayFontFamelyUrl = [];
        fs.map((f, i) => (arrayFontFamelyUrl[i] = f.url));
        styleFonts.innerHTML = arrayFontFamelyUrl.join('');
    }

    useEffect(() => {
        fontFamelyStyles(fonts);
    }, []);

    const fontSI = useSelector((state) => state.fontS);
    const setFamely = useSelector((state) => state.fontFamely);
    const aktiveFamely = useSelector((state) => state.aktiveFamely);
    const SETSIZE = useSelector((state) => state.fontSizes);
    const FONTFAMELYSELECT = useSelector((state) => state.fontFamelySelect);

    const [editorState, setEditorState] = useState(() => EditorState.createEmpty(decorator));

    const refs = useRef('editor');

    const focus = () => refs.current.focus();

    function handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return true;
        }
        return false;
    }

    function mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(e, editorState, 4 /* maxDepth */);
            if (newEditorState !== editorState) {
                setEditorState(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    function toggleBlockType(blockType) {
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    }

    function toggleInlineStyle(inlineStyle) {
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    }

    let className = 'editor';

    var contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== 'unstyled') {
            className += ' RichEditor-hidePlaceholder';
        }
    }
    styleMap.FS1.fontSize = `${fontSI}pt`;
    styleMap.FSFM.fontFamily = FONTFAMELYSELECT;

    const blockRenderMap = Map({
        TABLE: {
            element: 'td',
            wrapper: <Table />
        },
        TR: {
            element: 'td',
            wrapper: <table />
        }
    });

    function myBlockRenderer(contentBlock) {
        const type = contentBlock.getType();
        if (type === 'atomic') {
            return {
                component: MediaComponent,
                editable: false,
                props: {
                    foo: 'ячейка',
                    type: 'TABLE'
                }
            };
        }
        return null;
    }

    const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);
    return (
        <div className="editor-bg">
            <div className="control-panel">
                <BlockStyleControls editorState={editorState} onToggle={toggleBlockType} setEditorState={setEditorState} refs={refs} />
                <InlineStyleControls refs={refs} editorState={editorState} onToggle={toggleInlineStyle} setEditorState={setEditorState} />
            </div>
            <div
                className={className}
                style={{
                    fontFamily: aktiveFamely === true ? setFamely : '',
                    fontSize: SETSIZE + 'pt'
                }}
                onClick={focus}
            >
                <Editor
                    blockRendererFn={myBlockRenderer}
                    blockRenderMap={extendedBlockRenderMap}
                    blockStyleFn={getBlockStyle}
                    customStyleMap={styleMap}
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    keyBindingFn={mapKeyToEditorCommand}
                    onChange={setEditorState}
                    placeholder="Текст."
                    ref={refs}
                    spellCheck={true}
                    readOnly={false}
                />
            </div>
        </div>
    );
}
function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    }, callback);
}

const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return <a href={url}>{props.children}</a>;
};

function findTableEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();

        return entityKey !== null && contentState.getEntity(entityKey).getType() === 'TABLES';
    }, callback);
}

const Tables = (props) => {
    const { contentState, entityKey, blockKey, children, decoratedText, offsetKey } = props;
    const entity = contentState.getEntity(entityKey).getData();
    console.log(entity);
    function createElementsTd(td) {
        let textarea = document.createElement('textarea');
        textarea.value = td.innerHTML;
        td.innerHTML = '';
        td.appendChild(textarea);
        textarea.focus();
    }
    /*   Array.from(document.getElementsByTagName("table"))
    .filter((f) => f.getAttribute("data-position"))
    .map((m) =>
      Array.from(m.getElementsByTagName("td")).map((td) => createElementsTd(td))
    );
  Array.from(document.getElementsByTagName("span"))
    .filter((f) => f.getAttribute("data-offset-key"))
    .map((m) => console.log(m));
  
  console.log(blockKey);*/
    const container = React.useRef(null);
    return (
        <table data-position={blockKey} ref={container} focus={true}>
            <tr>
                <td>1111</td>
            </tr>
        </table>
    );
};

// Custom overrides for "code" style.

function getBlockStyle(block) {
    console.log(block.getType());
    switch (block.getType()) {
        case 'blockquote':
            return 'RichEditor-blockquote';
        default:
            return null;
    }
}

function createTr(props) {
    return <tr>{props.children}</tr>;
}
