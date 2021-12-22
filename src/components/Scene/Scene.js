import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import backPic from '../../assets/img/background.jpg';
import { cameraProps, alphaBet, tileSize, lightTone, darkTone, selectTone, modelProps, boardSize, aiLevel } from "../../utils/constant";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default class Scene extends Component {
    componentDidMount() {
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
        });
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.shadowMap.enabled = true;

        this.container.appendChild( renderer.domElement );


        // TODO : Camera Orbit control
        const controls = new OrbitControls(camera, this.container);
        controls.target.set(0, 0, 0);
        controls.update();


        // TODO : Scene Bloom Effect - Effect composer
        const params = {
            exposure: 1,
            bloomStrength: 0.25,
            bloomThreshold: 0,
            bloomRadius: 0.1
        };

        const renderScene = new RenderPass( scene, camera );

        const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
        bloomPass.threshold = params.bloomThreshold;
        bloomPass.strength = params.bloomStrength;
        bloomPass.radius = params.bloomRadius;

        const composer = new EffectComposer( renderer );
        composer.addPass( renderScene );
        composer.addPass( bloomPass );


        // TODO : light environment setup
        var hemiLight = new THREE.HemisphereLight(0xffdacf, 0x000000, 2);
        scene.add(hemiLight);

        var light = new THREE.SpotLight(0xffa68a, 2);
        light.position.set(-50,50,50);
        light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadow.mapSize.width = 1024 * 4;
        light.shadow.mapSize.height = 1024 * 4;
        scene.add( light );

        /////////////////////////////////////////////////////////////////////////////////////////////////
        /***********************************************************************************************/


        // TODO : Ground Meshes Array
        this.boardGroundArray = [];
        // TODO : ChessPieces Array
        this.boardPiecesArray = [];


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
            // animate every frame
            animate();
        })

        const self = this;
        // render every frame
        var animate = function () {
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

            // TODO : show last move history
            if( self.props.game.board.history.length > 0 ) {
                const toHistory = self.props.game.board.history.slice(-1)[0]['to'];
                const fromHistory = self.props.game.board.history.slice(-1)[0]['from'];

                const to_alpha = toHistory[0];
                const to_colIndex = alphaBet.indexOf(to_alpha);
                const to_rowIndex = toHistory[1] - 1;
                self.boardGroundArray[to_rowIndex][to_colIndex].mesh.material.color.setStyle('#d32da7');

                const from_alpha = fromHistory[0];
                const from_colIndex = alphaBet.indexOf(from_alpha);
                const from_rowIndex = fromHistory[1] - 1;
                self.boardGroundArray[from_rowIndex][from_colIndex].mesh.material.color.setStyle('#d32da7');
            }


            // renderer.render( scene, camera );
            composer.render();
        };

        
        var raycaster = new THREE.Raycaster();
        var mouse = new THREE.Vector2();
        window.addEventListener('mousedown', (event) => {
            event.preventDefault();
        
            if( this.props.game.board.configuration.turn !== this.props.side ) {
                return;
            }

            mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
        
            raycaster.setFromCamera( mouse, camera );
        
            // only can select own chess pieces
            const myPiecesArray = this.boardPiecesArray.filter((item) => 
                (this.props.side === 'white' && item.pieceType === item.pieceType.toUpperCase())
                || (this.props.side === 'black' && item.pieceType !== item.pieceType.toUpperCase())
            );

            for( let i = 0; i < myPiecesArray.length; i++ ) {
                const intersect = raycaster.intersectObject( myPiecesArray[i].mesh );

                if( intersect.length > 0 ) {
                    console.log('chess piece selected');
                    // TODO : this mesh has been clicked
                    if( this.selectedPiece ) {
                        if( this.selectedPiece.mesh.uuid === myPiecesArray[i].mesh.uuid ) {
                            return;
                        } else {
                            this.selectedPiece.mesh.position.y = this.selectedPiece.currentY;
                            const indicator = alphaBet[ this.selectedPiece.colIndex ] + ( this.selectedPiece.rowIndex + 1 );
                            const possibleMoves = this.props.game.moves(indicator);
                            possibleMoves.forEach((pos) => {
                                const alpha = pos[0];
                                const colIndex = alphaBet.indexOf(alpha);
                                const rowIndex = pos[1] - 1;
        
                                this.boardGroundArray[rowIndex][colIndex].mesh.material.color.setStyle( this.boardGroundArray[rowIndex][colIndex].color );
                            });
                        }
                    }

                    const indicator = alphaBet[ myPiecesArray[i].colIndex ] + ( myPiecesArray[i].rowIndex + 1 );
                    const possibleMoves = this.props.game.moves(indicator);
                    possibleMoves.forEach((pos) => {
                        const alpha = pos[0];
                        const colIndex = alphaBet.indexOf(alpha);
                        const rowIndex = pos[1] - 1;

                        this.boardGroundArray[rowIndex][colIndex].mesh.material.color.setStyle(selectTone);
                    });

                    this.selectedPiece = myPiecesArray[i];
                    this.selectedPiece.currentY = this.selectedPiece.mesh.position.y;
                    this.selectedPiece.animateDirection = 1;
                    return;
                }
            }

            for( let i = 0; i < boardSize; i++ ) {
                for( let j = 0; j < boardSize; j++ ) {
                    this.boardGroundArray[i][j].mesh.material.color.setStyle( this.boardGroundArray[i][j].color );
                }
            }

            if( this.selectedPiece ) {
                const indicator = alphaBet[ this.selectedPiece.colIndex ] + ( this.selectedPiece.rowIndex + 1 );
                const possibleMoves = this.props.game.moves(indicator);

                for( let i = 0; i < possibleMoves.length; i++ ) {
                    const alpha = possibleMoves[i][0];
                    const colIndex = alphaBet.indexOf(alpha);
                    const rowIndex = possibleMoves[i][1] - 1;
                    const groundMesh = this.boardGroundArray[rowIndex][colIndex].mesh;
                    const intersect = raycaster.intersectObject( groundMesh );

                    if( intersect.length > 0 ) {    // selected the possible move points
                        // move in game engine
                        const from = indicator;
                        const to = alphaBet[ colIndex ] + ( rowIndex + 1 );
                        this.props.game.move(from, to);

                        // check it chess piece eats
                        const delIndex = this.boardPiecesArray.findIndex((item) => item.rowIndex === rowIndex && item.colIndex === colIndex);

                        if( delIndex !== -1 ) {
                            scene.remove( this.boardPiecesArray[delIndex].mesh );
                            this.boardPiecesArray.splice(delIndex, 1);
                        }

                        // move in screen meshes
                        console.log('possible block selected');
                        this.selectedPiece.rowIndex = rowIndex;
                        this.selectedPiece.colIndex = colIndex;

                        const modelPosition = {
                            x: this.selectedPiece.colIndex * tileSize - tileSize * 3.5,
                            y: 0.6,
                            z: -(this.selectedPiece.rowIndex * tileSize - tileSize * 3.5)
                        };
                        this.selectedPiece.mesh.position.x = modelPosition.x;
                        this.selectedPiece.mesh.position.y = modelPosition.y;
                        this.selectedPiece.mesh.position.z = modelPosition.z;
                        this.selectedPiece = null;


                        aiMoveAction(aiLevel);
                        return;
                    }
                }
            }

            console.log('none selected');
            if( this.selectedPiece ) {
                this.selectedPiece.mesh.position.y = this.selectedPiece.currentY;
                this.selectedPiece = null;
            }
        })

        var aiMoveAction = (level) => {
            const thinkingTime = 1;
            setTimeout(() => {
                const result = this.props.game.aiMove(level);
                console.log(result);

                const from = Object.keys(result)[0];
                const to = result[from];
    
                const from_alpha = from[0];
                const from_colIndex = alphaBet.indexOf(from_alpha);
                const from_rowIndex = from[1] - 1;
    
                const to_alpha = to[0];
                const to_colIndex = alphaBet.indexOf(to_alpha);
                const to_rowIndex = to[1] - 1;
    
                // check it chess piece eats
                const toIndex = this.boardPiecesArray.findIndex((item) => item.rowIndex === to_rowIndex && item.colIndex === to_colIndex );
    
                if( toIndex !== -1 ) {
                    scene.remove( this.boardPiecesArray[toIndex].mesh );
                    this.boardPiecesArray.splice(toIndex, 1);
                }
    
                const fromIndex = this.boardPiecesArray.findIndex((item) => item.rowIndex === from_rowIndex && item.colIndex === from_colIndex );
                console.log(this.boardPiecesArray, fromIndex, from_rowIndex, from_colIndex);

                if( fromIndex !== -1 ) {
                    this.boardPiecesArray[fromIndex].rowIndex = to_rowIndex;
                    this.boardPiecesArray[fromIndex].colIndex = to_colIndex;
                    this.boardPiecesArray[fromIndex].mesh.position.x = to_colIndex * tileSize - tileSize * 3.5;
                    this.boardPiecesArray[fromIndex].mesh.position.z = -(to_rowIndex * tileSize - tileSize * 3.5);
                }
    
                console.log(this.props.game, Object.keys(this.props.game.board.configuration.pieces).length);
            }, 1000 * thinkingTime);
        }
    }
    render() {
        return (
            <div style={{ background: `url(${backPic})` }} ref={ref => (this.container = ref)}>
            </div>
        )
    }
}