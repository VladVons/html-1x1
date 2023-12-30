# cgi_server.py
from http.server import CGIHTTPRequestHandler, HTTPServer

port = 8888
handler = CGIHTTPRequestHandler

with HTTPServer(('localhost', port), handler) as server:
    print(f'Started CGI server on http://localhost:{port}')
    server.serve_forever()
