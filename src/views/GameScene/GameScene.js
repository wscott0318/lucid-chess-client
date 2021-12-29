import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { cameraProps, alphaBet, tileSize, lightTone, darkTone, selectTone, modelProps, boardSize, historyTone, dangerTone, gameModes, orbitControlProps, bloomParams, hemiLightProps, spotLightProps, spotLightProps2, pieceMoveSpeed, modelSize, userTypes, resizeUpdateInterval } from "../../utils/constant";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { aiMove } from 'js-chess-engine';
import { ang2Rad, getFenFromMatrixIndex, getMatrixIndexFromFen, getMeshPosition, isSamePoint } from "../../utils/helper";

import io from 'socket.io-client';
import { socketServerPort } from "../../config";
import { socketEvents } from "../../utils/packet";
import PawnModal from "../../components/UI/PawnModal/PawnModal";
import Victory from "../../components/UI/Victory/Victory";
import Loading from "../../components/UI/Loading/Loading";
import InviteFriend from "../../components/UI/InviteFriend/InviteFriend";
import Popup from "../../components/UI/Popup/Popup";
import GameStateHeader from "../../components/UI/GameState/GameStateHeader";
import GameStateFooter from "../../components/UI/GameState/GameStateFooter";

import backPic from '../../assets/img/background.jpg';

import { throttle } from 'lodash-es';
import "./GameScene.scss";

export default class Scene extends Component {
    componentDidMount() {
        // TODO : component state implementation
        this.setState({
            showPieceSelectModal: false,
            showWaitingModal: true,
            waitingModalTitle: "Loading...",
            showInviteModal: false,
        });

        /**********************************  Scene Environment Setup  **********************************/
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // TODO : Create Three.js Scene, Camera, Renderer
        var scene = new THREE.Scene();
        this.scene = scene;

        var camera = new THREE.PerspectiveCamera( cameraProps.fov, cameraProps.aspect, cameraProps.near, cameraProps.far );
        camera.position.x = cameraProps.position.x;
        camera.position.y = cameraProps.position.y;
        camera.position.z = cameraProps.position.z;

        if( this.props.mode === gameModes['P2E'] && this.props.side === 'black' )
            camera.position.z = -cameraProps.position.z;

        window.camera = camera

        camera.lookAt(orbitControlProps.target.x, orbitControlProps.target.y, orbitControlProps.target.z)
        console.log(orbitControlProps.target, camera)


        var renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });

        const w_h = this.getWidthHeight(camera.aspect);
        renderer.setSize(w_h.width, w_h.height);
        renderer.shadowMap.enabled = true;

        this.container.appendChild( renderer.domElement );

        var bgTexture = new THREE.TextureLoader().load(backPic);
        bgTexture.minFilter = THREE.LinearFilter;
        scene.background = bgTexture;

        // TODO : Camera Orbit control
        const controls = new OrbitControls( camera, this.container );
        controls.target.set( orbitControlProps.target.x, orbitControlProps.target.y, orbitControlProps.target.z );
        controls.maxPolarAngle = orbitControlProps.maxPolarAngle;
        controls.maxDistance = orbitControlProps.maxDistance;
        controls.minDistance = orbitControlProps.minDistance;
        controls.update();

        var light = new THREE.SpotLight( spotLightProps.color, spotLightProps.intensity );
        light.position.set( -spotLightProps.position.x, spotLightProps.position.y, spotLightProps.position.z );
        light.castShadow = spotLightProps.castShadow;
        light.shadow.bias = spotLightProps.shadow.bias;
        light.shadow.mapSize.width = spotLightProps.shadow.mapSize.width;
        light.shadow.mapSize.height = spotLightProps.shadow.mapSize.height;
        scene.add( light );

        var light2 = new THREE.SpotLight( spotLightProps2.color, spotLightProps2.intensity );
        light2.position.set( -spotLightProps2.position.x, spotLightProps2.position.y, spotLightProps2.position.z );
        light2.castShadow = spotLightProps2.castShadow;
        light2.shadow.bias = spotLightProps2.shadow.bias;
        light2.shadow.mapSize.width = spotLightProps2.shadow.mapSize.width;
        light2.shadow.mapSize.height = spotLightProps2.shadow.mapSize.height;
        scene.add( light2 );

        const light3 = new THREE.AmbientLight( 0xeeeeee ); // soft white light
        scene.add( light3 );

/***************************outline **********************************/
        const composer = new EffectComposer( renderer );
        const renderScene = new RenderPass( scene, camera );
        
        composer.addPass( renderScene );

        // const redOut = new CustomOutlinePass(
        //     new THREE.Vector2(window.innerWidth, window.innerHeight),
        //     this.scene,
        //     this.camera,
        //     0
        // );
        // const blueOut = new CustomOutlinePass(
        //     new THREE.Vector2(window.innerWidth, window.innerHeight),
        //     this.scene,
        //     this.camera,
        //     1
        // );
        // composer.addPass(redOut);
        // composer.addPass(blueOut);

        // TODO: Scene Outline Effect - Effect composer
        const whiteTeamObjects = []
        const blackTeamObjects = []
        
        const outlineParams = {
            edgeStrength: 3,
            edgeGlow: 0,
            edgeThickness: 1,
            pulsePeriod: 0,
            usePatternTexture: false
        };

        const redOutlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, []);
        redOutlinePass.renderToScreen = true;
        redOutlinePass.edgeStrength = outlineParams.edgeStrength;
        redOutlinePass.edgeGlow = outlineParams.edgeGlow;
        redOutlinePass.visibleEdgeColor.set(0xcccccc);
        redOutlinePass.hiddenEdgeColor.set(0x000000);

        const blueOutlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, []);
        blueOutlinePass.renderToScreen = true;
        blueOutlinePass.edgeStrength = outlineParams.edgeStrength;
        blueOutlinePass.edgeGlow = outlineParams.edgeGlow;
        blueOutlinePass.visibleEdgeColor.set(0xff0000);
        blueOutlinePass.hiddenEdgeColor.set(0x000000);

        composer.addPass( redOutlinePass );
        composer.addPass( blueOutlinePass );

/////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************/

        // TODO : Windows Resize Handle
        var setCanvasDimensions = ( canvas, width, height, set2dTransform = false ) => {
            const ratio = window.devicePixelRatio;
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            if (set2dTransform) {
              canvas.getContext('2d').setTransform(ratio, 0, 0, ratio, 0, 0);
            }
        }

        window.addEventListener(
            'resize',
            throttle(
                () => {
                    const w_h = this.getWidthHeight(camera.aspect);
                    camera.updateProjectionMatrix();
                    renderer.setSize(w_h.width, w_h.height);
                    setCanvasDimensions(renderer.domElement, w_h.width, w_h.height);
                },
                resizeUpdateInterval,
                { trailing: true }
            )
        );


        // TODO : Ground Meshes Array
        this.boardGroundArray = [];
        // TODO : ChessPieces Array
        this.boardPiecesArray = [];
        // TODO : mesh Array
        this.meshArray = {};

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'); // use a full url path
        dracoLoader.preload();

        var loader = new GLTFLoader();  // GLTF loader to load gltf models
        loader.setDRACOLoader(dracoLoader);
        
        // TODO : Load GLTF models
        Promise.all([
            loader.loadAsync( 'models/chess-board.glb' ),
            loader.loadAsync( 'models/piece/Golem.glb' ),
            loader.loadAsync( 'models/piece/Cerberus.glb' ),
            loader.loadAsync( 'models/piece/Keo502.glb' ),
            loader.loadAsync( 'models/piece/Bahamut.glb' ),
            loader.loadAsync( 'models/piece/Medusa.glb' ),
            loader.loadAsync( 'models/piece/Kong.glb' ),
            loader.loadAsync( 'models/piece/Fox.glb' ),
            loader.loadAsync( 'models/piece/Lucifer.glb' ),
            loader.loadAsync( 'models/chess-cell.glb' )
        ]).then((gltfArray) => {
            
            // TODO : Add chess board to the scene
            var board = gltfArray[0].scene.clone();
            board.scale.set( modelProps.board.scale, modelProps.board.scale, modelProps.board.scale );
            board.position.set( modelProps.board.position.x, modelProps.board.position.y, modelProps.board.position.z );
            scene.add(board);

            board.traverse(n => { if ( n.isMesh ) {
                n.castShadow = true;
                n.receiveShadow = true;
                if(n.material.map) n.material.map.anisotropy = 16;
            }});

            this.meshArray['pawn'] = gltfArray[1].scene.clone();
            this.meshArray['knight'] = gltfArray[2].scene.clone();
            this.meshArray['bishop'] = gltfArray[3].scene.clone();
            this.meshArray['rook'] = gltfArray[4].scene.clone();
            this.meshArray['queen'] = gltfArray[5].scene.clone();
            this.meshArray['king'] = gltfArray[6].scene.clone();
            this.meshArray['fox'] = gltfArray[7].scene.clone();
            this.meshArray['lucifer'] = gltfArray[8].scene.clone();
            

            // add and initialize board ground and characters 
            for( let i = 0; i < boardSize; i++ ) {
                this.boardGroundArray.push([]);
                for( let j = 0; j < boardSize; j++ ) {
                    const tileMesh = gltfArray[9].scene.clone();
                    tileMesh.scale.set( modelProps.cell.scale, modelProps.cell.scale, modelProps.cell.scale );
                    tileMesh.children[0].material = tileMesh.children[0].material.clone()
                    tileMesh.material = tileMesh.children[0].material
                    tileMesh.material.color = (i + j) % 2 ? new THREE.Color(lightTone) : new THREE.Color(darkTone);
                    tileMesh.position.set( j * tileSize - tileSize * 3.5 + 0.035, 0.5, -(i * tileSize - tileSize * 3.5));

                    tileMesh.children[0].traverse(n => { if ( n.isMesh ) {
                        n.castShadow = true;
                        n.receiveShadow = true;
                        if(n.material.map) n.material.map.anisotropy = 16; 
                    }});

                    scene.add(tileMesh);

                    const indicator = alphaBet[j] + ( i + 1 );

                    this.boardGroundArray[i].push({
                        mesh: tileMesh,
                        rowIndex: i,
                        colIndex: j,
                        indicator: indicator,
                        color: (i + j) % 2 ? lightTone : darkTone,
                    })

                    const piece = this.props.game.board.configuration.pieces[ indicator ];

                    const axis = new THREE.Vector3(0, 1, 0);

                    if( piece ) {
                        var mesh = null;

                        switch(piece) {
                            case 'P':
                                mesh = gltfArray[1].scene.clone();
                                mesh.rotation.y = Math.PI;
                            break;
                            case 'p':
                                mesh = gltfArray[1].scene.clone();
                            break;
                            case 'N':
                                mesh = gltfArray[2].scene.clone();
                                mesh.rotateOnAxis(axis, Math.PI);
                            break;
                            case 'n':
                                mesh = gltfArray[2].scene.clone();
                            break;
                            case 'B':
                                mesh = gltfArray[3].scene.clone();
                                mesh.rotateOnAxis(axis, Math.PI);
                            break;
                            case 'b':
                                mesh = gltfArray[3].scene.clone();
                            break;
                            case 'R':
                                mesh = gltfArray[4].scene.clone();
                                mesh.rotateOnAxis(axis, Math.PI);
                            break;
                            case 'r':
                                mesh = gltfArray[4].scene.clone();
                            break;
                            case 'Q':
                                mesh = gltfArray[5].scene.clone();
                                mesh.rotateOnAxis(axis, Math.PI);
                            break;
                            case 'q':
                                mesh = gltfArray[7].scene.clone();
                            break;
                            case 'K':
                                mesh = gltfArray[6].scene.clone();
                                mesh.rotateOnAxis(axis, Math.PI);
                            break;
                            case 'k':
                                mesh = gltfArray[8].scene.clone();
                            break;
                        }

                        const modelPosition = getMeshPosition(i, j);

                        mesh.position.set( modelPosition.x, modelPosition.y, modelPosition.z );
                        mesh.scale.set(modelSize, modelSize, modelSize);
                        scene.add(mesh);

                        if (piece === piece.toUpperCase()) {
                            whiteTeamObjects.push(mesh)
                        } else {
                            blackTeamObjects.push(mesh)
                        }
                        //TODO: tag piece by name
                        if (piece === piece.toUpperCase()) {
                            mesh.traverse(n => { //Fox
                                // n.applyOutline  = true; //set outline
                                // n.applyOutlineType = 0;
                                if ( n.isMesh ) {
                                    const material = new THREE.MeshStandardMaterial({
                                        color: '#d29868',
                                        roughness: 0.3,
                                        metalness: 0.2,
                                    });
                                    n.material= material
                                }
                            });
                            // mesh.traverse(node => node.applyOutline = true);

                        } else {
                            mesh.traverse(n => { //Fox
                                // n.applyOutline  = true; //set outline
                                // n.applyOutlineType = 1;
                                if ( n.isMesh ) {
                                    const material = new THREE.MeshStandardMaterial({
                                        color: '#0e191f',
                                        roughness: 0.3,
                                        metalness: 0.2,
                                    });
                                    n.material= material
                                }
                            });
                        }

                        redOutlinePass.selectedObjects = whiteTeamObjects;
                        blueOutlinePass.selectedObjects = blackTeamObjects;

                        mesh.children[0].traverse(n => { if ( n.isMesh ) {
                            n.castShadow = true;
                            n.receiveShadow = true;
                            if(n.material.map) n.material.map.anisotropy = 16; 
                        }});

                        const temp = {};
                        temp.mesh = mesh;
                        temp.pieceType = piece;
                        temp.rowIndex = i;
                        temp.colIndex = j;
                        this.boardPiecesArray.push(temp);
                    }
                }
            }

            renderer.domElement.addEventListener('mousedown', mouseDownAction);

            console.error('load finished!');
            if( this.props.mode === gameModes['P2P'] ) {
                this.socket = io.connect(`http://${window.location.hostname}:${socketServerPort}`);

                
                const data = {};
                if( this.props.friendMatch ) {  // friend match
                    if( this.props.userType === userTypes['creator'] ) {
                        // create Room
                        data.username = this.props.username;
                        data.friendMatch = this.props.friendMatch;
    
                        this.socket.emit( socketEvents['CS_CreateRoom'], data );
                        this.socket.on( socketEvents['SC_RoomCreated'], this.handleRoomCreated.bind(this) );
                    } else if( this.props.userType === userTypes['joiner'] ) {
                        //join Friend Match Room
                        data.username = this.props.username;
                        data.friendMatch = this.props.friendMatch;
                        data.roomId = this.props.roomId;
    
                        this.socket.emit( socketEvents['CS_JoinRoom'], data );
                    }
                } else {    // match matching
                    data.username = this.props.username;
                    data.friendMatch = false;

                    this.socket.emit( socketEvents['CS_MatchPlayLogin'], data );
                }
                
                this.setState({
                    waitingModalTitle: 'Waiting other player to Join',
                })

                this.socket.on( socketEvents['SC_GameStarted'], this.handleGameStarted.bind(this) );
                this.socket.on( socketEvents['SC_ChangeTurn'], this.handleChangeTurn.bind(this) );
                this.socket.on( socketEvents['SC_PlayerLogOut'], this.handlePlayerLogOut.bind(this) );
                this.socket.on( socketEvents['SC_ForceExit'], this.handleForceExit.bind(this) );
                this.socket.on( socketEvents['SC_SelectPiece'], this.handleSelectPiece.bind(this) );
                this.socket.on( socketEvents['SC_PawnTransform'], this.handlePawnTransform.bind(this) );
                this.socket.on( socketEvents['SC_PerformMove'], this.handlePerformMove.bind(this) );
                this.socket.on( socketEvents['SC_UnSelectPiece'], this.handleUnSelectPiece.bind(this) );
                this.socket.on( socketEvents['SC_RemainingTime'], this.handleRemainingTime.bind(this) );
            } else {
                this.setState({
                    showWaitingModal: false,
                })
                // animate every frame
                animate();

                if( this.props.mode === gameModes['P2E'] && this.props.side === 'black' ) {
                    aiMoveAction(this.props.aiLevel);
                }

                if( this.props.mode === gameModes['P2E'] ) {
                    this.setState({
                        myTurn: this.props.side === this.props.game.board.configuration.turn
                    })

                    const aiNames = [
                        'AI MonKey',
                        'Beginner',
                        'Intermediate',
                        'Advanced'
                    ];

                    this.setState({
                        opponentName: aiNames[ this.props.aiLevel ]
                    })

                    
                    this.startNewTimer();
                }
            }
        })

        const self = this;
        var mouseDownAction = function (event) {
            event.preventDefault();

            if( self.props.mode === gameModes['P2P'] && self.currentPlayer !== self.socket.id ) {
                return;
            } else if( self.props.mode === gameModes['P2E'] && self.props.game.board.configuration.turn !== self.props.side ) {
                return;
            }

            // detect the collider
            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector2();

            mouse.x = ((event.clientX - (window.innerWidth - renderer.domElement.clientWidth) / 2)  / renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ((event.clientY - (window.innerHeight - renderer.domElement.clientHeight) / 2) / renderer.domElement.clientHeight) * 2 + 1;
        
            raycaster.setFromCamera( mouse, camera );
        
            // only can select own chess pieces
            const myPiecesArray = self.boardPiecesArray.filter(item => {
                if( self.props.mode === gameModes['practise'] ) {
                    return true;
                } else if( self.props.mode === gameModes['P2E'] ) {
                    return (self.props.side === 'white' && item.pieceType === item.pieceType.toUpperCase())
                    || (self.props.side === 'black' && item.pieceType !== item.pieceType.toUpperCase());
                } else if( self.props.mode === gameModes['P2P'] ) {
                    return (self.side === 'white' && item.pieceType === item.pieceType.toUpperCase())
                    || (self.side === 'black' && item.pieceType !== item.pieceType.toUpperCase());
                }
                return false;
            });

            for( let i = 0; i < myPiecesArray.length; i++ ) {
                const intersect = raycaster.intersectObject( myPiecesArray[i].mesh );

                if( intersect.length > 0 ) {
                    if( self.props.mode === gameModes['P2P'] ) {
                        const fen = getFenFromMatrixIndex( myPiecesArray[i].rowIndex, myPiecesArray[i].colIndex );
                        self.socket.emit( socketEvents['CS_SelectPiece'], { fen } );
                    } else {
                        // TODO : this mesh has been clicked
                        self.selectPiece( myPiecesArray[i] );

                        const indicator = getFenFromMatrixIndex(myPiecesArray[i].rowIndex, myPiecesArray[i].colIndex);
                        self.possibleMoves = self.props.game.moves(indicator);
                    }
                    return;
                }
            }

            // TODO : check if select move possible position 
            if( self.selectedPiece ) {
                for( let i = 0; i < self.possibleMoves.length; i++ ) {
                    const groundIndex = getMatrixIndexFromFen( self.possibleMoves[i] );
                    const groundMesh = self.boardGroundArray[ groundIndex.rowIndex][ groundIndex.colIndex ].mesh;
                    const intersect = raycaster.intersectObject( groundMesh );

                    if( intersect.length > 0 ) {    // selected the possible move points
                        const from = getFenFromMatrixIndex(self.selectedPiece.rowIndex, self.selectedPiece.colIndex);
                        const to = getFenFromMatrixIndex( groundIndex.rowIndex, groundIndex.colIndex );
                        if( self.props.mode === gameModes['P2P'] ) {
                            self.socket.emit( socketEvents['CS_PerformMove'], { from, to } );
                        } else {
                            // move in game engine
                            const res = {}; res[from] = to;

                            performMove(res);
                            
                            self.selectedPiece = null;

                            // TODO : AI move action
                            if( self.props.mode === gameModes['P2E'] && !self.checkIfFinished() && !self.state.pawnTransProps ) {
                                aiMoveAction(self.props.aiLevel);
                            }
                        }
                        return;
                    }
                }
            }

            // TODO : none selected
            if( self.selectedPiece ) {
                if( self.props.mode === gameModes['P2P'] ) {
                    self.socket.emit( socketEvents['CS_UnSelectPiece'] );
                } else {
                    self.selectedPiece.mesh.position.y = self.selectedPiece.currentY;
                    self.selectedPiece = null;
                }
            }
        };

        var aiMoveAction = (level) => {
            const thinkingTime = 1; // AI thinking time

            setTimeout(() => {
                const result = aiMove(this.props.game.board.configuration, level);

                performMove(result);
            }, 1000 * thinkingTime);
        }
        this.aiMoveAction = aiMoveAction;

        var movePiece = ( piece, rowIndex, colIndex ) => {
            piece.rowIndex = rowIndex;
            piece.colIndex = colIndex;

            const position = getMeshPosition(rowIndex, colIndex);

            piece.mesh.position.y = position.y;
            
            piece.moveAnim = {
                target: position,
                speed: {
                    x: (position.x - piece.mesh.position.x) / pieceMoveSpeed,
                    z: (position.z - piece.mesh.position.z) / pieceMoveSpeed,
                }
            }
        }
        this.movePiece = movePiece;

        var performMove = (moveResult) => {
            const from = Object.keys(moveResult)[0];
            const to = moveResult[from];

            const fromMatrixIndex = getMatrixIndexFromFen(from);
            const toMatrixIndex = getMatrixIndexFromFen(to);

            // check chese piece on the target position: eat action performed at that time
            const toIndex = this.boardPiecesArray.findIndex((item) => item.rowIndex === toMatrixIndex.rowIndex && item.colIndex === toMatrixIndex.colIndex );

            if( toIndex !== -1 ) {
                scene.remove( this.boardPiecesArray[toIndex].mesh );
                this.boardPiecesArray.splice(toIndex, 1);
            }

            // move chese piece to the target position
            const fromIndex = this.boardPiecesArray.findIndex((item) => item.rowIndex === fromMatrixIndex.rowIndex && item.colIndex === fromMatrixIndex.colIndex );

            if( fromIndex !== -1 ) {
                movePiece( this.boardPiecesArray[fromIndex], toMatrixIndex.rowIndex, toMatrixIndex.colIndex );
            }


            // check if king special move case
            if( this.props.game.board.configuration.turn === 'white' ) {
                if( this.boardPiecesArray[fromIndex].pieceType === 'K' && to === 'C1' && this.props.game.board.configuration.castling.whiteLong ) {
                    const matrixIndex = getMatrixIndexFromFen('A1');
                    const rook = this.boardPiecesArray.filter((item) => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);
                    const targetIndex = getMatrixIndexFromFen('D1');

                    movePiece( rook[0], targetIndex.rowIndex, targetIndex.colIndex );
                } else if( this.boardPiecesArray[fromIndex].pieceType === 'K' && to === 'G1' && this.props.game.board.configuration.castling.whiteShort ) {
                    const matrixIndex = getMatrixIndexFromFen('H1');
                    const rook = this.boardPiecesArray.filter((item) => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);
                    const targetIndex = getMatrixIndexFromFen('F1');
                    
                    movePiece( rook[0], targetIndex.rowIndex, targetIndex.colIndex );
                }
            } else if( this.props.game.board.configuration.turn === 'black' ) {
                if( this.boardPiecesArray[fromIndex].pieceType === 'k' && to === 'C8' && this.props.game.board.configuration.castling.blackLong ) {
                    const matrixIndex = getMatrixIndexFromFen('A8');
                    const rook = this.boardPiecesArray.filter((item) => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);
                    const targetIndex = getMatrixIndexFromFen('D8');
                    
                    movePiece( rook[0], targetIndex.rowIndex, targetIndex.colIndex );
                } else if( this.boardPiecesArray[fromIndex].pieceType === 'k' && to === 'G8' && this.props.game.board.configuration.castling.blackShort ) {
                    const matrixIndex = getMatrixIndexFromFen('H8');
                    const rook = this.boardPiecesArray.filter((item) => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);
                    const targetIndex = getMatrixIndexFromFen('F8');
                    
                    movePiece( rook[0], targetIndex.rowIndex, targetIndex.colIndex );
                }
            }


            // TODO : check if pawn arrived last spuare
            const currentTurn = this.props.game.board.configuration.turn;
            if( ( currentTurn === 'white' && this.boardPiecesArray[fromIndex].pieceType === 'P' && this.boardPiecesArray[fromIndex].rowIndex === 7 )
                || ( currentTurn === 'black' && this.boardPiecesArray[fromIndex].pieceType === 'p' && this.boardPiecesArray[fromIndex].rowIndex === 0 )
            ) {
                if( this.props.mode === gameModes['P2E'] && this.props.side !== currentTurn ) { // AI turn
                    const type = currentTurn === 'white' ? 'Q' : 'q';

                    this.boardPiecesArray[fromIndex].pieceType = type;

                    scene.remove( this.boardPiecesArray[fromIndex].mesh );

                    this.boardPiecesArray[fromIndex].mesh = this.getTargetMesh( type );
                    const position = getMeshPosition( this.boardPiecesArray[fromIndex].rowIndex, this.boardPiecesArray[fromIndex].colIndex );
                    this.boardPiecesArray[fromIndex].mesh.position.set(position.x, position.y, position.z);
                    this.boardPiecesArray[fromIndex].mesh.scale.set(modelSize, modelSize, modelSize);
                    this.boardPiecesArray[fromIndex].mesh.rotation.y = type === type.toUpperCase() ? Math.PI : 0;

                    scene.add( this.boardPiecesArray[fromIndex].mesh );
                } else {
                    this.setState({ showPieceSelectModal: true });
                    this.setState({ pawnTransProps: {
                        fromIndex,
                        from,
                        to
                    } })
                    return;
                }
            }


            this.props.game.move(from, to);

            if( this.props.mode === gameModes['P2E'] ) {
                this.setState({
                    myTurn: this.props.side === this.props.game.board.configuration.turn
                })

                this.startNewTimer();
            }
        }
        this.performMove = performMove;

        // render every frame
        var animate = function () {
            if( self.moveFinished() ) {
                if( self.props.mode === gameModes['P2P'] && self.isFinished ) {
                    if( self.side !== self.currentTurn ) {
                        self.setState({
                            showVictoryModal: true,
                            showLoseModal: false,
                        });
                    } else {
                        self.setState({
                            showVictoryModal: false,
                            showLoseModal: true,
                        });
                    }
                    return;
                } else if( self.checkIfFinished() ) {
                    if( self.props.side !== self.props.game.board.configuration.turn ) {
                        self.setState({
                            showVictoryModal: true,
                            showLoseModal: false,
                        });
                    } else {
                        self.setState({
                            showVictoryModal: false,
                            showLoseModal: true,
                        });
                    }
                    return;
                }
            }

            // TODO : Camera Target Update
            controls.target.set( orbitControlProps.target.x, orbitControlProps.target.y, orbitControlProps.target.z );
            controls.update();

            // TODO : Selected Piece Animation
            if( self.selectedPiece ) {
                const maxHeight = 0.3;
                const speed = 0.05;
                if( self.selectedPiece.mesh.position.y > self.selectedPiece.currentY +  maxHeight || self.selectedPiece.mesh.position.y < self.selectedPiece.currentY) {
                    self.selectedPiece.animateDirection = -self.selectedPiece.animateDirection;
                }
                self.selectedPiece.mesh.position.y += self.selectedPiece.animateDirection * speed;
            }


            // TODO : board ground settings
            // TODO : clear board ground color
            for( let i = 0; i < boardSize; i++ ) {
                for( let j = 0; j < boardSize; j++ ) {
                    self.boardGroundArray[i][j].mesh.material.color.setStyle( self.boardGroundArray[i][j].color );
                }
            }

            // TODO : show last move history
            let toHistory, fromHistory;
            if( self.props.mode === gameModes['P2P'] ) {
                if( self.lastMoveHistory ) {
                    toHistory = self.lastMoveHistory['to'];
                    fromHistory = self.lastMoveHistory['from'];

                    const toMatrixIndex = getMatrixIndexFromFen(toHistory);
                    self.boardGroundArray[ toMatrixIndex.rowIndex ][ toMatrixIndex.colIndex ].mesh.material.color.setStyle(historyTone);
        
                    const fromMatrixIndex = getMatrixIndexFromFen(fromHistory);
                    self.boardGroundArray[ fromMatrixIndex.rowIndex ][ fromMatrixIndex.colIndex ].mesh.material.color.setStyle(historyTone);
                }
            } else {
                if( self.props.game.board.history.length > 0 ) {
                    toHistory = self.props.game.board.history.slice(-1)[0]['to'];
                    fromHistory = self.props.game.board.history.slice(-1)[0]['from'];

                    const toMatrixIndex = getMatrixIndexFromFen(toHistory);
                    self.boardGroundArray[ toMatrixIndex.rowIndex ][ toMatrixIndex.colIndex ].mesh.material.color.setStyle(historyTone);

                    const fromMatrixIndex = getMatrixIndexFromFen(fromHistory);
                    self.boardGroundArray[ fromMatrixIndex.rowIndex ][ fromMatrixIndex.colIndex ].mesh.material.color.setStyle(historyTone);
                }
            }

            // TODO : show danger for king
            if( self.props.mode === gameModes['P2P'] && self.dangerKing && ( self.dangerKing['K'] || self.dangerKing['k'] ) ) {
                const pieceType = self.dangerKing['K'] ? 'K' : 'k';
                const kIndex = self.boardPiecesArray.findIndex((item) => item.pieceType === pieceType);
                const rowIndex = self.boardPiecesArray[kIndex].rowIndex;
                const colIndex = self.boardPiecesArray[kIndex].colIndex;

                self.boardGroundArray[rowIndex][colIndex].mesh.material.color.setStyle( dangerTone );
            } else {
                const pieceType = self.props.game.board.getPlayingColor() === 'white' ? 'K' : 'k';

                const kIndex = self.boardPiecesArray.findIndex((item) => item.pieceType === pieceType);
                const rowIndex = self.boardPiecesArray[kIndex].rowIndex;
                const colIndex = self.boardPiecesArray[kIndex].colIndex;
    
                const pointer = getFenFromMatrixIndex( rowIndex, colIndex );
                if( self.props.game.board.isPieceUnderAttack(pointer) ) {
                    self.boardGroundArray[rowIndex][colIndex].mesh.material.color.setStyle( dangerTone );
                }
            }

            // TODO : show move possible grounds
            if( self.selectedPiece && self.possibleMoves ) {
                self.possibleMoves.forEach((pos) => {
                    const matrixIndex = getMatrixIndexFromFen(pos);
    
                    self.boardGroundArray[ matrixIndex.rowIndex ][ matrixIndex.colIndex ].mesh.material.color.setStyle( selectTone );
                });
            }

            // TODO : piece move animation
            self.boardPiecesArray.forEach((item) => {
                if( item.moveAnim && !isSamePoint(item.moveAnim.target, item.mesh.position) ) {
                    item.mesh.position.x += item.moveAnim.speed.x;
                    item.mesh.position.z += item.moveAnim.speed.z;

                    const preX = item.moveAnim.speed.x > 0 ? 1 : -1;
                    const preZ = item.moveAnim.speed.z > 0 ? 1 : -1;

                    if( preX * item.mesh.position.x >= preX * item.moveAnim.target.x ) {
                        item.mesh.position.x = item.moveAnim.target.x;
                    }
                    if( preZ * item.mesh.position.z >= preZ * item.moveAnim.target.z ) {
                        item.mesh.position.z = item.moveAnim.target.z;
                    }
                }
            });
            
            requestAnimationFrame( animate );
            // render composer effect
            // renderer.render(scene, camera);
            composer.render();
        };
        this.animate = animate;
    }
    componentWillUnmount() {
        this.socket.off( socketEvents['SC_RoomCreated'], this.handleRoomCreated.bind(this) );
        this.socket.off( socketEvents['SC_GameStarted'], this.handleGameStarted.bind(this) );
        this.socket.off( socketEvents['SC_ChangeTurn'], this.handleChangeTurn.bind(this) );
        this.socket.off( socketEvents['SC_PlayerLogOut'], this.handlePlayerLogOut.bind(this) );
        this.socket.off( socketEvents['SC_ForceExit'], this.handleForceExit.bind(this) );
        this.socket.off( socketEvents['SC_SelectPiece'], this.handleSelectPiece.bind(this) );
        this.socket.off( socketEvents['SC_PawnTransform'], this.handlePawnTransform.bind(this) );
        this.socket.off( socketEvents['SC_PerformMove'], this.handlePerformMove.bind(this) );
        this.socket.off( socketEvents['SC_UnSelectPiece'], this.handleUnSelectPiece.bind(this) );
        this.socket.off( socketEvents['SC_RemainingTime'], this.handleRemainingTime.bind(this) );

        this.socket.close();
    }
    getWidthHeight(aspect) {
        let width = window.innerWidth;
        let height = window.innerHeight;
        const preWidth = aspect * height;
        if (preWidth > width) {
            height = width / aspect;
        } else {
            width = preWidth;
        }
        return { width: width, height: height };
    }
    checkIfFinished() {
        const moves = this.props.game.moves();
        let totalCount = 0;
        for( const i in moves ) {
            totalCount += moves[i].length;
        }

        return totalCount === 0 || this.props.game.board.configuration.isFinished;
    }
    moveFinished() {
        let isFinished = true;
        this.boardPiecesArray.forEach((item) => {
            if( item.moveAnim && !isSamePoint(item.moveAnim.target, item.mesh.position) ) {
                isFinished = false;
            }
        })
        return isFinished;
    }
    getTargetMesh(type) {
        if( type === 'N' || type === 'n' ) {
            return this.meshArray['knight'].clone();
        }
        if( type === 'B' || type === 'b' ) {
            return this.meshArray['bishop'].clone();
        }
        if( type === 'R' || type === 'r' ) {
            return this.meshArray['rook'].clone();
        }
        if( type === 'Q' ) {
            return this.meshArray['queen'].clone();
        }
        if( type === 'q' ) {
            return this.meshArray['fox'].clone();
        }
    }
    pawnTransform( type ) {
        if( !type || type === '' )
            return;

        const currentTurn = this.props.mode === gameModes['P2P'] ? this.currentTurn : this.props.game.board.configuration.turn;
        let pieceType;
        if( type === 'Knight' ) {
            pieceType = currentTurn === 'white' ? 'N' : 'n';
        } else if( type === 'Bishop' ) {
            pieceType = currentTurn === 'white' ? 'B' : 'b';
        } else if( type === 'Rook' ) {
            pieceType = currentTurn === 'white' ? 'R' : 'r';
        } else if( type === 'Queen' ) {
            pieceType = currentTurn === 'white' ? 'Q' : 'q';
        }

        const targetPiece = this.boardPiecesArray[ this.state.pawnTransProps.fromIndex ];
        targetPiece.pieceType = pieceType;

        this.scene.remove( targetPiece.mesh );

        targetPiece.mesh = this.getTargetMesh(pieceType);
        const position = getMeshPosition( targetPiece.rowIndex, targetPiece.colIndex );
        targetPiece.mesh.position.set(position.x, position.y, position.z);
        targetPiece.mesh.scale.set(modelSize, modelSize, modelSize);
        targetPiece.mesh.rotation.y = pieceType === pieceType.toUpperCase() ? Math.PI : 0;

        this.scene.add( targetPiece.mesh );

        this.setState({
            showPieceSelectModal: false,
            pawnTransProps: null,
        });

        if( this.props.mode === gameModes['P2P'] ) {
            this.socket.emit( socketEvents['CS_PawnTransform'], { from: this.state.pawnTransProps.from, to: this.state.pawnTransProps.to, pieceType: pieceType } );
        } else {
            this.props.game.move( this.state.pawnTransProps.from, this.state.pawnTransProps.to );
            this.props.game.setPiece( this.state.pawnTransProps.to, pieceType );
    
            this.setState({
                myTurn: this.props.side === this.props.game.board.configuration.turn
            })

            this.startNewTimer();

            if( this.props.mode === gameModes['P2E'] ) {    // ai action after select the piece 
                this.aiMoveAction(this.props.aiLevel);
            }
        }
    }

    selectPiece( piece ) {
        if( this.selectedPiece ) {
            if( this.selectedPiece.mesh.uuid === piece.mesh.uuid ) { // TODO : do nothing when reselect the current selected chess piece
                return;
            } else {
                this.selectedPiece.mesh.position.y = this.selectedPiece.currentY;   // TODO : restore height of the old selected piece
            }
        }

        // TODO : select new chess piece
        this.selectedPiece = piece;
        this.selectedPiece.currentY = this.selectedPiece.mesh.position.y;
        this.selectedPiece.animateDirection = 1;
    }

    startNewTimer() {
        if( this.timeInterval )
            clearInterval( this.timeInterval );
        
        this.setState({
            remainingTime: 30
        })

        const self = this;
        this.timeInterval = setInterval(() => {
            const currentRemaining = self.state.remainingTime;

            if( currentRemaining === 0) {
                const result = aiMove(self.props.game.board.configuration, 0);

                self.performMove(result);

                self.aiMoveAction(self.props.aiLevel);
                return;
            }

            self.setState({
                remainingTime: currentRemaining - 1
            })
        }, 1000);
    }

    /**************************************************** Socket Handlers ******************************************************/
    handleRoomCreated(params) {
        this.setState({
            roomId: params.roomId,
            showInviteModal: true,
        });
    }

    handleGameStarted(params) {
        this.setState({
            showWaitingModal: false,
            showInviteModal: false,
        });

        const { white, black, players } = params;

        for( let i = 0; i < players.length; i++ ) {
            if( players[i].socketId !== this.socket.id ) {
                this.setState({
                    opponentName: players[i].username
                })
            }
        }

        if( this.socket.id === white ) {
            this.camera.position.z = cameraProps.position.z;
        } else if( this.socket.id === black ) {
            this.camera.position.z = -cameraProps.position.z;
        }

        this.animate();
    }

    handleChangeTurn(params) {
        this.isFinished = params.isFinished ? true : false;

        this.currentTurn = params.currentTurn;
        this.currentPlayer = params.currentPlayer;

        if( this.currentPlayer === this.socket.id ) {
            this.setState({
                myTurn: true,
            })
            this.side = this.currentTurn;
        } else {
            this.side = this.currentTurn === 'white' ? 'black' : 'white';
            this.setState({
                myTurn: false,
            })
        }

        this.dangerKing = params.dangerKing;
        this.lastMoveHistory = params.lastMoveHistory;

        console.error(params);
    }

    handleSelectPiece(params) {
        const { fen, possibleMoves } = params;

        const matrixIndex = getMatrixIndexFromFen(fen);
        const meshIndex = this.boardPiecesArray.findIndex((item) => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);

        this.selectPiece( this.boardPiecesArray[ meshIndex ] );

        if( this.side === this.currentTurn ) {
            this.possibleMoves = possibleMoves;
        }
    }

    handlePlayerLogOut(params) {
        const username = params.username;
        
        this.setState({
            showLeaveNotificationModal: true,
            showLeaveNotificationMessage: username + ' logged out!'
        });

        // this.isFinished = true;
    }

    handleForceExit(params) {
        // TODO : Redirect to the frist page or etc
        this.setState({
            showLeaveNotificationModal: true,
            showLeaveNotificationMessage: params.message
        });

        // this.isFinished = true;
    }

    handlePawnTransform(params) {
        if( this.side !== this.currentTurn )
            return;

        const { from, to } = params;

        const matrixIndex = getMatrixIndexFromFen( from );
        const fromIndex = this.boardPiecesArray.findIndex(item => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);

        this.setState({ showPieceSelectModal: true });
        this.setState({ pawnTransProps: {
            fromIndex,
            from,
            to
        } });
    }

    handlePerformMove(params) {
        const { from, to, castling, pieceType } = params;

        const fromMatrixIndex = getMatrixIndexFromFen(from);
        const toMatrixIndex = getMatrixIndexFromFen(to);

        // check chese piece on the target position: eat action performed at that time
        const toIndex = this.boardPiecesArray.findIndex((item) => item.rowIndex === toMatrixIndex.rowIndex && item.colIndex === toMatrixIndex.colIndex );

        if( toIndex !== -1 ) {
            this.scene.remove( this.boardPiecesArray[toIndex].mesh );
            this.boardPiecesArray.splice(toIndex, 1);
        }

        // move chese piece to the target position
        const fromIndex = this.boardPiecesArray.findIndex((item) => item.rowIndex === fromMatrixIndex.rowIndex && item.colIndex === fromMatrixIndex.colIndex );

        if( fromIndex !== -1 ) {
            if( pieceType ) {
                this.boardPiecesArray[fromIndex].pieceType = pieceType;

                this.scene.remove( this.boardPiecesArray[fromIndex].mesh );

                this.boardPiecesArray[fromIndex].mesh = this.getTargetMesh(pieceType);
                const position = getMeshPosition( this.boardPiecesArray[fromIndex].rowIndex, this.boardPiecesArray[fromIndex].colIndex );
                this.boardPiecesArray[fromIndex].mesh.position.set(position.x, position.y, position.z);
                this.boardPiecesArray[fromIndex].mesh.scale.set(modelSize, modelSize, modelSize);
                this.boardPiecesArray[fromIndex].mesh.rotation.y = pieceType === pieceType.toUpperCase() ? Math.PI : 0;

                this.scene.add( this.boardPiecesArray[fromIndex].mesh );
            }

            this.movePiece( this.boardPiecesArray[fromIndex], toMatrixIndex.rowIndex, toMatrixIndex.colIndex );
        }

        if( castling.whiteLong ) {
            const matrixIndex = getMatrixIndexFromFen('A1');
            const rook = this.boardPiecesArray.filter((item) => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);
            const targetIndex = getMatrixIndexFromFen('D1');

            this.movePiece( rook[0], targetIndex.rowIndex, targetIndex.colIndex );
        } else if ( castling.whiteShort ) {
            const matrixIndex = getMatrixIndexFromFen('H1');
            const rook = this.boardPiecesArray.filter((item) => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);
            const targetIndex = getMatrixIndexFromFen('F1');
            
            this.movePiece( rook[0], targetIndex.rowIndex, targetIndex.colIndex );
        } else if( castling.blackLong ) {
            const matrixIndex = getMatrixIndexFromFen('A8');
            const rook = this.boardPiecesArray.filter((item) => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);
            const targetIndex = getMatrixIndexFromFen('D8');
            
            this.movePiece( rook[0], targetIndex.rowIndex, targetIndex.colIndex );
        } else if( castling.blackShort ) {
            const matrixIndex = getMatrixIndexFromFen('H8');
            const rook = this.boardPiecesArray.filter((item) => item.rowIndex === matrixIndex.rowIndex && item.colIndex === matrixIndex.colIndex);
            const targetIndex = getMatrixIndexFromFen('F8');
            
            this.movePiece( rook[0], targetIndex.rowIndex, targetIndex.colIndex );
        }

        if( this.selectedPiece ) {
            this.selectedPiece.mesh.position.y = this.selectedPiece.currentY;
            this.selectedPiece = null;
        }
        this.possibleMoves = null;
    }

    handleUnSelectPiece() {
        this.selectedPiece.mesh.position.y = this.selectedPiece.currentY;
        this.selectedPiece = null;
        this.possibleMoves = null;
    }

    handleRemainingTime(params) {
        const { remainingTime } = params;
        this.setState({
            remainingTime: remainingTime
        })
    }

    /***************************************************************************************************************************/

    render() {
        return (
          <div className="GameScene">
            <div className="game-canvas" ref={(ref) => (this.container = ref)}>
                <GameStateHeader
                    opponentName={this.state && this.state.opponentName}
                    myTurn={this.state && this.state.myTurn}
                    remainingTime={this.state && this.state.remainingTime} />
                <GameStateFooter></GameStateFooter>
            </div>

            {/* Pawn transform modal when pawn reaches the endpoint */}
            <PawnModal
              show={this.state && this.state.showPieceSelectModal}
              pawnTransform={this.pawnTransform.bind(this)}
            />

            {/* Victory modal */}
            <Victory show={this.state && this.state.showVictoryModal} />

            {/* leave room notification popup */}
            <Popup
              show={this.state && this.state.showLeaveNotificationModal}
              type={"leaveNotification"}
              message={this.state && this.state.showLeaveNotificationMessage}
            />

            {/* loading screen */}
            {this.state && this.state.showWaitingModal ? (
              <Loading title={this.state.waitingModalTitle} />
            ) : null}

            {/* Invite friend modal */}
            <InviteFriend
              show={this.state && this.state.showInviteModal}
              hideAction={() => this.setState({ showInviteModal: false })}
              roomId={this.state && this.state.roomId}
            />
          </div>
        );
    }
}