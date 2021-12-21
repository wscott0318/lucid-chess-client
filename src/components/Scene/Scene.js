import React, { Component } from "react";
import * as THREE from "three";
import { Camera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import backPic from '../../assets/img/background.jpg';
import { cameraProps, ambientLightProps, spotLightProps, alphaBet, tileSize, lightTone, darkTone, modelProps, boardSize } from "../../utils/constant";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default class Scene extends Component {
    componentDidMount() {
        // TODO : Create Three.js Scene, Camera, Renderer
        var scene = new THREE.Scene();

        var camera = new THREE.PerspectiveCamera( cameraProps.fov, cameraProps.aspect, cameraProps.near, cameraProps.far );
        this.camera = camera;
        camera.position.x = cameraProps.position.x;
        camera.position.y = cameraProps.position.y;
        camera.position.z = cameraProps.position.z;

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

        
        // TODO : Load GLTF models
        var loader = new GLTFLoader();
        const self = this;
        this.boardGroundArray = [];
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


            // TODO : Add chess pieces and ground meshes
            for( let i = 0; i < boardSize; i++ ) {
                self.boardGroundArray.push([]);
                for( let j = 0; j < boardSize; j++ ) {
                    const tileGeom = new THREE.BoxGeometry(tileSize, 0.1, tileSize);
                    const material = new THREE.MeshPhongMaterial({
                        color: (j + i) % 2 ? lightTone : darkTone,
                        side: THREE.DoubleSide,
                    });
                    const tileMesh = new THREE.Mesh(tileGeom, material);
                    tileMesh.position.set(i * tileSize - tileSize * 3.5, 0.5, j * tileSize - tileSize * 3.5);
                    tileMesh.receiveShadow = true;

                    scene.add(tileMesh);

                    const indicator = alphaBet[i] + ( j + 1 );
                    const piece = this.props.game.board.configuration.pieces[ indicator ];

                    const axis = new THREE.Vector3(0, 1, 0);
                    
                    if( piece ) {
                        var mesh = null;

                        switch(piece) {
                            case 'P':
                                mesh = gltfArray[1].scene.clone();

                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.75 );
                                mesh.scale.set(0.7, 0.7, 0.7,);
                                scene.add(mesh);
                            break;
                            case 'p':
                                mesh = gltfArray[1].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.25 );
                                mesh.scale.set(0.7, 0.7, 0.7,);
                                
                                mesh.rotation.y = Math.PI;
                                scene.add(mesh);
                            break;
                            case 'N':
                                mesh = gltfArray[2].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                scene.add(mesh);
                            break;
                            case 'n':
                                mesh = gltfArray[2].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                
                                mesh.rotateOnAxis(axis, Math.PI);
                                scene.add(mesh);
                            break;
                            case 'B':
                                mesh = gltfArray[3].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                
                                scene.add(mesh);
                            break;
                            case 'b':
                                mesh = gltfArray[3].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                
                                mesh.rotateOnAxis(axis, Math.PI);
                                scene.add(mesh);
                            break;
                            case 'R':
                                mesh = gltfArray[4].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                
                                scene.add(mesh);
                            break;
                            case 'r':
                                mesh = gltfArray[4].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                
                                mesh.rotateOnAxis(axis, Math.PI);
                                scene.add(mesh);
                            break;
                            case 'Q':
                                mesh = gltfArray[5].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                
                                mesh.rotateOnAxis(axis, Math.PI);
                                scene.add(mesh);
                            break;
                            case 'q':
                                mesh = gltfArray[5].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                
                                scene.add(mesh);
                            break;
                            case 'K':
                                mesh = gltfArray[6].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                
                                scene.add(mesh);
                            break;
                            case 'k':
                                mesh = gltfArray[6].scene.clone();
                                mesh.position.set( i * tileSize - tileSize * 3.5, 0.55, j * tileSize - tileSize * 3.5 );
                                mesh.scale.set(0.8, 0.8, 0.8);
                                
                                mesh.rotateOnAxis(axis, Math.PI);
                                scene.add(mesh);
                            break;
                        }

                        mesh.children[0].traverse(n => { if ( n.isMesh ) {
                            n.castShadow = true;
                            n.receiveShadow = true;
                            if(n.material.map) n.material.map.anisotropy = 16; 
                        }});
                    }
                }
            }
        })

        // render every frame
        var animate = function () {
            requestAnimationFrame( animate );

            light.position.set( 
                camera.position.x + 20,
                camera.position.y + 20,
                camera.position.z + 20,
            );

            // renderer.render( scene, camera );
            composer.render();
        };
        animate();
    }
    render() {
        return (
            <div style={{ background: `url(${backPic})` }} ref={ref => (this.container = ref)}>
            </div>
        )
    }
}