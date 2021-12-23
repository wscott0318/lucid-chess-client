import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import backPic from '../../assets/img/background.jpg';
import { cameraProps, alphaBet, tileSize, lightTone, darkTone, selectTone, modelProps, boardSize, aiLevel, historyTone, dangerTone, gameModes, orbitControlProps, bloomParams, hemiLightProps, spotLightProps, pieceMoveSpeed } from "../../utils/constant";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { aiMove } from 'js-chess-engine';
import { getFenFromMatrixIndex, getMatrixIndexFromFen, isSamePoint } from "../../utils/helper";

export default class Scene extends Component {
    componentDidMount() {
        // // TODO : component state implementation
        // this.state = {
        //     showPieceSelectModal: false,
        // }

        /**********************************  Scene Environment Setup  **********************************/
        /////////////////////////////////////////////////////////////////////////////////////////////////
        // TODO : Create Three.js Scene, Camera, Renderer
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera( cameraProps.fov, cameraProps.aspect, cameraProps.near, cameraProps.far );
        camera.position.x = cameraProps.position.x;
        camera.position.y = cameraProps.position.y;
        camera.position.z = this.props.side === 'white' ? cameraProps.position.z : -cameraProps.position.z;

        var renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
        });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;

        this.container.appendChild( renderer.domElement );


        // TODO : Camera Orbit control
        const controls = new OrbitControls( camera, this.container );
        controls.target.set( orbitControlProps.target.x, orbitControlProps.target.y, orbitControlProps.target.z );
        controls.update();


        // TODO : Scene Bloom Effect - Effect composer
        const renderScene = new RenderPass( scene, camera );

        const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 0, 0, 0 );
        bloomPass.threshold = bloomParams.bloomThreshold;
        bloomPass.strength = bloomParams.bloomStrength;
        bloomPass.radius = bloomParams.bloomRadius;

        // TODO: Scene Outline Effect - Effect composer
        const whiteTeamObjects = []
        const blackTeamObjects = []
        
        const outlineParams = {
            edgeStrength: 2,
            edgeGlow: 1,
            edgeThickness: 1.0,
            pulsePeriod: 0,
            usePatternTexture: false
        };

        const redOutlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, []);
        redOutlinePass.renderToScreen = true;
        redOutlinePass.edgeStrength = outlineParams.edgeStrength;
        redOutlinePass.edgeGlow = outlineParams.edgeGlow;
        redOutlinePass.visibleEdgeColor.set(0xff0000);
        redOutlinePass.hiddenEdgeColor.set(0xff0000);

        const blueOutlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, []);
        blueOutlinePass.renderToScreen = true;
        blueOutlinePass.edgeStrength = outlineParams.edgeStrength;
        blueOutlinePass.edgeGlow = outlineParams.edgeGlow;
        blueOutlinePass.visibleEdgeColor.set(0x0000ff);
        blueOutlinePass.hiddenEdgeColor.set(0x0000ff);

        const composer = new EffectComposer( renderer );
        composer.addPass( renderScene );
        composer.addPass( bloomPass );
        composer.addPass( redOutlinePass );
        composer.addPass( blueOutlinePass );


        // TODO : light environment setup
        var hemiLight = new THREE.HemisphereLight(hemiLightProps.skyColor, hemiLightProps.groundColor, hemiLightProps.intensity);
        scene.add(hemiLight);

        var light = new THREE.SpotLight( spotLightProps.color, spotLightProps.intensity );
        light.position.set( -spotLightProps.position.x, spotLightProps.position.y, spotLightProps.position.z );
        light.castShadow = spotLightProps.castShadow;
        light.shadow.bias = spotLightProps.shadow.bias;
        light.shadow.mapSize.width = spotLightProps.shadow.mapSize.width;
        light.shadow.mapSize.height = spotLightProps.shadow.mapSize.height;
        scene.add( light );

        /////////////////////////////////////////////////////////////////////////////////////////////////
        /***********************************************************************************************/


        // TODO : Ground Meshes Array
        this.boardGroundArray = [];
        // TODO : ChessPieces Array
        this.boardPiecesArray = [];
        // TODO : mesh Array
        this.meshArray = {};

        var loader = new GLTFLoader();  // GLTF loader to load gltf models
        
        // TODO : Load GLTF models
        Promise.all([
            loader.loadAsync( 'models/board.glb' ),
            loader.loadAsync( 'models/piece/Golem.glb' ),
            loader.loadAsync( 'models/piece/Cerberus.glb' ),
            loader.loadAsync( 'models/piece/Keo502.glb' ),
            loader.loadAsync( 'models/piece/Bahamut.glb' ),
            loader.loadAsync( 'models/piece/Medusa.glb' ),
            loader.loadAsync( 'models/piece/Medusa.glb' ),
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

            for( let i = 0; i < boardSize; i++ ) {
                this.boardGroundArray.push([]);
                for( let j = 0; j < boardSize; j++ ) {
                    const tileGeom = new THREE.BoxGeometry(tileSize, 0.1, tileSize);
                    const material = new THREE.MeshPhongMaterial({
                        color: (i + j) % 2 ? lightTone : darkTone,
                        side: THREE.DoubleSide,
                    });
                    const tileMesh = new THREE.Mesh(tileGeom, material);
                    tileMesh.position.set( j * tileSize - tileSize * 3.5, 0.5, -(i * tileSize - tileSize * 3.5));
                    tileMesh.receiveShadow = true;

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
                            break;
                            case 'q':
                                mesh = gltfArray[5].scene.clone();
                                mesh.rotateOnAxis(axis, Math.PI);
                            break;
                            case 'K':
                                mesh = gltfArray[6].scene.clone();
                                mesh.rotateOnAxis(axis, Math.PI);
                            break;
                            case 'k':
                                mesh = gltfArray[6].scene.clone();
                            break;
                        }

                        const modelPosition = {
                            x: j * tileSize - tileSize * 3.5,
                            y: 0.6,
                            z: - (i * tileSize - tileSize * 3.5)
                        };
                        const modelSize = 0.8;

                        mesh.position.set( modelPosition.x, modelPosition.y, modelPosition.z );
                        mesh.scale.set(modelSize, modelSize, modelSize);
                        scene.add(mesh);

                        //TODO: tag piece by name
                        if (piece === piece.toUpperCase()) {
                            whiteTeamObjects.push(mesh)
                        } else {
                            blackTeamObjects.push(mesh)
                        }

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

            redOutlinePass.selectedObjects = whiteTeamObjects;
            blueOutlinePass.selectedObjects = blackTeamObjects;

            // animate every frame
            animate();
            
            renderer.domElement.addEventListener('mousedown', mouseDownAction);

            if( this.props.mode === gameModes['P2E'] && this.props.side === 'black' ) {
                aiMoveAction(aiLevel);
            }
        })

        const self = this;
        var mouseDownAction = function (event) {
            event.preventDefault();
        
            if( self.props.game.board.configuration.turn !== self.props.side ) {
                return;
            }

            var raycaster = new THREE.Raycaster();
            var mouse = new THREE.Vector2();

            mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        
            raycaster.setFromCamera( mouse, camera );
        
            // only can select own chess pieces
            const myPiecesArray = self.boardPiecesArray.filter((item) => 
                (self.props.side === 'white' && item.pieceType === item.pieceType.toUpperCase())
                || (self.props.side === 'black' && item.pieceType !== item.pieceType.toUpperCase())
            );

            for( let i = 0; i < myPiecesArray.length; i++ ) {
                const intersect = raycaster.intersectObject( myPiecesArray[i].mesh );

                if( intersect.length > 0 ) {
                    // TODO : this mesh has been clicked
                    if( self.selectedPiece ) {
                        if( self.selectedPiece.mesh.uuid === myPiecesArray[i].mesh.uuid ) { // TODO : do nothing when reselect the current selected chess piece
                            return;
                        } else {
                            self.selectedPiece.mesh.position.y = self.selectedPiece.currentY;   // TODO : restore height of the old selected piece
                        }
                    }

                    // TODO : select new chess piece
                    self.selectedPiece = myPiecesArray[i];
                    self.selectedPiece.currentY = self.selectedPiece.mesh.position.y;
                    self.selectedPiece.animateDirection = 1;
                    return;
                }
            }

            // TODO : check if select move possible position 
            if( self.selectedPiece ) {
                const indicator = getFenFromMatrixIndex(self.selectedPiece.rowIndex, self.selectedPiece.colIndex);
                const possibleMoves = self.props.game.moves(indicator);

                for( let i = 0; i < possibleMoves.length; i++ ) {
                    const groundIndex = getMatrixIndexFromFen( possibleMoves[i] );
                    const groundMesh = self.boardGroundArray[ groundIndex.rowIndex][ groundIndex.colIndex ].mesh;
                    const intersect = raycaster.intersectObject( groundMesh );

                    if( intersect.length > 0 ) {    // selected the possible move points
                        // move in game engine
                        const from = indicator;
                        const to = getFenFromMatrixIndex( groundIndex.rowIndex, groundIndex.colIndex );
                        const res = {}; res[from] = to;

                        performMove(res);
                        
                        self.selectedPiece = null;

                        // TODO : AI move action
                        if( !self.props.game.board.configuration.isFinished ) {
                            aiMoveAction(aiLevel);
                        }
                        return;
                    }
                }
            }

            // TODO : none selected
            if( self.selectedPiece ) {
                self.selectedPiece.mesh.position.y = self.selectedPiece.currentY;
                self.selectedPiece = null;
            }
        };

        var aiMoveAction = (level) => {
            const thinkingTime = 1; // AI thinking time

            setTimeout(() => {
                const result = aiMove(this.props.game.board.configuration, level);

                performMove(result);
    
                console.log(this.props.game, Object.keys(this.props.game.board.configuration.pieces).length);
            }, 1000 * thinkingTime);
        }

        var movePiece = ( piece, rowIndex, colIndex ) => {
            piece.rowIndex = rowIndex;
            piece.colIndex = colIndex;

            const position = {
                x: colIndex * tileSize - tileSize * 3.5,
                y: 0.6,
                z: -(rowIndex * tileSize - tileSize * 3.5)
            };

            piece.mesh.position.y = position.y;
            
            piece.moveAnim = {
                target: position,
                speed: {
                    x: (position.x - piece.mesh.position.x) / pieceMoveSpeed,
                    z: (position.z - piece.mesh.position.z) / pieceMoveSpeed,
                }
            }
        }

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


            // TODO : check if pawn arrived last spuare
            // if( this.props.mode === gameModes['P2E'] ) {
            //     const currentTurn = this.props.game.board.configuration.turn;

            //     if( currentTurn === this.props.side ) { // user case
            //         if( (this.props.side === 'white' && this.boardPiecesArray[fromIndex].pieceType === 'P' && this.boardPiecesArray[fromIndex].rowIndex === 7) 
            //             || (this.props.side === 'black' && this.boardPiecesArray[fromIndex].pieceType === 'p' && this.boardPiecesArray[fromIndex].rowIndex === 0) ) {

            //             this.setState({ showPieceSelectModal: true });
            //             return;
            //         } else {
            //             if( (currentTurn === 'white' && this.boardPiecesArray[fromIndex].pieceType === 'P' && this.boardPiecesArray[fromIndex].rowIndex === 7) 
            //             || (currentTurn === 'black' && this.boardPiecesArray[fromIndex].pieceType === 'p' && this.boardPiecesArray[fromIndex].rowIndex === 0) ) {
            //                 const type = currentTurn === 'white' ? 'Q' : 'q';
            //                 this.props.game.setPiece(to, type);
            //                 this.boardPiecesArray[fromIndex].pieceType = type;
            //                 scene.remove( this.boardPiecesArray[fromIndex].mesh );
            //                 this.boardPiecesArray[fromIndex].mesh = this.meshArray['queen'].clone();
            //                 scene.add(this.boardPiecesArray[fromIndex].mesh);
            //             }
            //         }
            //     }
            // }

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

            this.props.game.move(from, to);
        }

        // render every frame
        var animate = function () {
            if( self.props.game.board.configuration.isFinished ) {
                alert( (self.props.game.board.configuration.turn === 'white' ? 'black' : 'white') + ' won!');
                return;
            }

            requestAnimationFrame( animate );

            // TODO : light position setting
            light.position.set( 
                camera.position.x + 20,
                camera.position.y + 20,
                camera.position.z + 20,
            );

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
            if( self.props.game.board.history.length > 0 ) {
                const toHistory = self.props.game.board.history.slice(-1)[0]['to'];
                const fromHistory = self.props.game.board.history.slice(-1)[0]['from'];

                const toMatrixIndex = getMatrixIndexFromFen(toHistory);
                self.boardGroundArray[ toMatrixIndex.rowIndex ][ toMatrixIndex.colIndex ].mesh.material.color.setStyle(historyTone);

                const fromMatrixIndex = getMatrixIndexFromFen(fromHistory);
                self.boardGroundArray[ fromMatrixIndex.rowIndex ][ fromMatrixIndex.colIndex ].mesh.material.color.setStyle(historyTone);
            }

            // TODO : show move possible grounds
            if( self.selectedPiece ) {
                const indicator = getFenFromMatrixIndex(self.selectedPiece.rowIndex, self.selectedPiece.colIndex);
                const possibleMoves = self.props.game.moves(indicator);
                possibleMoves.forEach((pos) => {
                    const matrixIndex = getMatrixIndexFromFen(pos);
    
                    self.boardGroundArray[ matrixIndex.rowIndex ][ matrixIndex.colIndex ].mesh.material.color.setStyle( selectTone );
                });
            }

            // TODO : show danger for king
            const pieceType = self.props.game.board.getPlayingColor() === 'white' ? 'K' : 'k';

            const kIndex = self.boardPiecesArray.findIndex((item) => item.pieceType === pieceType);
            const rowIndex = self.boardPiecesArray[kIndex].rowIndex;
            const colIndex = self.boardPiecesArray[kIndex].colIndex;

            const pointer = getFenFromMatrixIndex( rowIndex, colIndex );
            if( self.props.game.board.isPieceUnderAttack(pointer) ) {
                self.boardGroundArray[rowIndex][colIndex].mesh.material.color.setStyle( dangerTone );
            }

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

            // // render composer effect
            renderer.render(scene, camera);
            composer.render();
        };
    }
    render() {
        return (
            <div style={{ background: `url(${backPic})` }} ref={ref => (this.container = ref)}>
                
            </div>
        )
    }
}